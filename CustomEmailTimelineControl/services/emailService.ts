/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmailCardProps } from "../EmailCard";
import { IInputs } from "../generated/ManifestTypes";
import sampleEmails from "../sample_email.json";

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

    const query = `?fetchXml=${fetchXml}`
    return context.webAPI.retrieveMultipleRecords("email", query).then(
        (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
            console.log("Emails retrieved:", response.entities);
            console.table(response.entities);
            return response.entities;
        },
        (errorResponse) => {
            console.error("Error retrieving emails:", errorResponse);
            return [];
        }
    );
}

export const generateEmailsFromJson = (): IEmailCardProps[] => {
    const emails = sampleEmails.map((email: any) => {
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
        };
    });
    return emails.sort((a, b) => b.modifiedOn.getTime() - a.modifiedOn.getTime());
};
