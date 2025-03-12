/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmailCardProps } from "../EmailCard";
import { IInputs } from "../generated/ManifestTypes";
import sampleEmails from "../sample_email.json";
import { IEmailCardAttachment } from "../EmailCard";

export async function getIncidentEntityData(context: ComponentFramework.Context<IInputs>, incidentId: string): Promise<ComponentFramework.WebApi.Entity | null> {
    incidentId = incidentId.replace("{", "").replace("}", "");
    return context.webAPI.retrieveRecord("incident", incidentId, "?$select=incidentid,_parentcaseid_value").then(
        (response) => {
            return response;
        },
        (errorResponse) => {
            console.error("Error retrieving parent case ID:", errorResponse);
            return null;
        }
    );
}

export async function getCurrentEntityData(context: ComponentFramework.Context<IInputs>): Promise<ComponentFramework.WebApi.Entity | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let entityId = (context.mode as any).contextInfo.entityId;
    entityId = entityId.replace("{", "").replace("}", "");

    return context.webAPI.retrieveRecord("incident", entityId, "?$select=incidentid,_parentcaseid_value").then(
        (response) => {
            return response;
        },
        (errorResponse) => {
            console.error("Error retrieving parent case ID:", errorResponse);
            return null;
        }
    );
}

export async function getAllEmails(context: ComponentFramework.Context<IInputs>): Promise<ComponentFramework.WebApi.Entity[]> {
    const collectCurrent = context.parameters.CollectCurrentRecordEmails.raw;
    const collectParent = context.parameters.CollectParentEmails.raw;
    const collectAncestors = context.parameters.CollectAncestorEmails.raw;

    let ancestors = await getCurrentEntityData(context).then(async (entity) => {
        if (entity) {
            const ancestorIds = [];
            if (collectCurrent) {
                ancestorIds.push(entity.incidentid);
            }
            if (collectParent && entity._parentcaseid_value) {
                ancestorIds.push(entity._parentcaseid_value);
            }
            if (collectAncestors) {
                // Add logic to fetch all ancestor IDs
                if (entity._parentcaseid_value) {
                    ancestorIds.push(entity._parentcaseid_value);

                    let currentParentId = entity._parentcaseid_value;

                    while (currentParentId) {
                        const parentEntity = await getIncidentEntityData(context, currentParentId);
                        if (parentEntity && parentEntity._parentcaseid_value) {
                            currentParentId = parentEntity._parentcaseid_value;
                            ancestorIds.push(currentParentId);
                        } else {
                            currentParentId = null;
                        }
                    }
                }
            }
            return ancestorIds;
        } else {
            return [];
        }
    });

    ancestors = Array.from(new Set(ancestors));

    if (ancestors.length === 0) {
        return [];
    }

    const filterValues = ancestors.map((ancestor) => {
        return `<value uitype="incident">` + ancestor + `</value>`;
    }).join('');

    const fetchXml = `
        <fetch version="1.0" output-format="xml-platform" mapping="logical">
            <entity name="email">
                <attribute name="subject" />
                <order attribute="subject" descending="false" />
                <attribute name="description" />
                <attribute name="regardingobjectid" />
                <attribute name="from" />
                <attribute name="to" />
                <attribute name="statuscode" />
                <attribute name="createdon" />
                <attribute name="modifiedon" />
                <attribute name="activityid" />
                <filter type="and">
                    <condition attribute="regardingobjectid" operator="in">
                        ${filterValues}
                    </condition>
                </filter>
            </entity>
        </fetch>
        `;

    const filterValuesAttachments = ancestors.map((ancestor) => {
        return `<value>` + ancestor + `</value>`;
    }).join('');

    const emailAttachmentFetchXml = `
        <fetch version="1.0" output-format="xml-platform" mapping="logical">
            <entity name="email">
                <attribute name="activityid" />
                <filter>
                <condition attribute="regardingobjectid" operator="in" uitype="incident">
                    ${filterValuesAttachments}
                </condition>
                </filter>
                <order attribute="createdon" descending="true" />
                <link-entity name="activitymimeattachment" from="objectid" to="activityid" alias="activitymimeattachment">
                <attribute name="attachmentid" />
                <link-entity name="attachment" from="attachmentid" to="attachmentid" alias="attachment">
                    <attribute name="attachmentid" />
                    <attribute name="filename" />
                    <attribute name="filesize" />
                    <attribute name="mimetype" />
                </link-entity>
                </link-entity>
            </entity>
        </fetch>
    `



    const emailFetchQuery = `?fetchXml=${fetchXml}`;
    const retrievedEmails = await context.webAPI.retrieveMultipleRecords("email", emailFetchQuery).then(
        (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
            return response.entities;
        },
        (errorResponse) => {
            console.error("Error retrieving emails:", errorResponse);
            return [];
        }
    );

    const attachmentsFetchQuery = `?fetchXml=${emailAttachmentFetchXml}`;
    const emailsWithAttachments = await context.webAPI.retrieveMultipleRecords("email", attachmentsFetchQuery).then(
        (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
            return response.entities;
        },
        (errorResponse) => {
            console.error("Error retrieving emails with attachments:", errorResponse);
            return [];
        }
    );

    // Merge attachments into emails
    retrievedEmails.forEach(email => {
        email.attachments = emailsWithAttachments
            .filter(attachedEmail => attachedEmail.activityid === email.activityid)
            .map(attachedEmail => ({
                attachmentid: attachedEmail["activitymimeattachment.attachmentid"],
                filename: attachedEmail["attachment.filename"],
                filesize: attachedEmail["attachment.filesize"],
                mimetype: attachedEmail["attachment.mimetype"],
                context: context,
            } as IEmailCardAttachment));
    });

    console.log("Emails with attachments merged:", retrievedEmails);


    return retrievedEmails;
}

export async function getAttachmentBody(emailAttachment: IEmailCardAttachment): Promise<ArrayBuffer> {
    const fetchXml = `
        <fetch version="1.0" output-format="xml-platform" mapping="logical">
            <entity name="attachment">
                <attribute name="body" />
                <filter>
                    <condition attribute="attachmentid" operator="eq" value="${emailAttachment.attachmentid}" />
                </filter>
            </entity>
        </fetch>
    `;

    const query = `?fetchXml=${fetchXml}`;
    const response = await emailAttachment.context.webAPI.retrieveMultipleRecords("attachment", query);
    if (response.entities.length > 0) {
        const body = response.entities[0].body;
        return Uint8Array.from(atob(body), c => c.charCodeAt(0)).buffer;
    } else {
        throw new Error("Attachment not found");
    }
}

export const generateEmailsFromJson = (): IEmailCardProps[] => {
    const emails = sampleEmails.map((email: any) => {
        const fromParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 1);
        const toParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 2);
        return {
            from: fromParty ? (fromParty.addressused || fromParty["_partyid_value@OData.Community.Display.V1.FormattedValue"]) : "unknown",
            sent: new Date(email.createdon).toLocaleString(),
            to: toParty ? (toParty.addressused || toParty["_partyid_value@OData.Community.Display.V1.FormattedValue"]) : "unknown",
            subject: email.subject,
            content: email.description,
            createdOn: new Date(email.createdon),
            modifiedOn: new Date(email.modifiedon),
            isVisualized: email.statuscode === 6,
            emailId: email.activityid,
            attachments: email.attachments || [],
            context: null as any as ComponentFramework.Context<IInputs>,
        };
    });
    return emails.sort((a, b) => b.modifiedOn.getTime() - a.modifiedOn.getTime());
};

export const transformRawEmailMessages = (emailMessages: ComponentFramework.WebApi.Entity[]): IEmailCardProps[] => {
    const emails = emailMessages.map((email) => {
        const fromParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 1);
        const toParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 2);
        return {
            from: fromParty ? fromParty.addressused : "unknown",
            sent: new Date(email.createdon).toLocaleString(),
            to: toParty ? (toParty.addressused || toParty["_partyid_value@OData.Community.Display.V1.FormattedValue"]) : "unknown",
            subject: email.subject,
            content: email.description,
            createdOn: new Date(email.createdon),
            modifiedOn: new Date(email.modifiedon),
            isVisualized: email.statuscode === 6,
            emailId: email.activityid,
            context: null as any as ComponentFramework.Context<IInputs>,
            attachments: email.attachments || [],
        };
    });
    return emails.sort((a, b) => b.modifiedOn.getTime() - a.modifiedOn.getTime());
};
