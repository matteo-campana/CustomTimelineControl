import { IChatCardProps } from "../chat/ChatCard";
import { IChatMessageProps } from "../chat/ChatMessage";
import { IInputs } from "../generated/ManifestTypes";
import sampleData from "../sample-whatsapp-chat.json";
import { getCaseIds } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDocumentBodyContent(base64String: string): any {
    try {
        if (!base64String) {
            return [];
        }

        const decodedString = atob(base64String);

        const parsedContent = JSON.parse(decodedString);
        if (Array.isArray(parsedContent) && parsedContent.length > 0 && parsedContent[0].Content) {
            return JSON.parse(parsedContent[0].Content);
        }
        return parsedContent;
    } catch (error) {
        console.error("Error decoding document body content:", error);
        return [];
    }
}

export async function getWhatsAppChats(context: ComponentFramework.Context<IInputs>): Promise<ComponentFramework.WebApi.Entity[]> {

    const ancestors = await getCaseIds(context);

    if (ancestors.length === 0) {
        return [];
    }

    const filterValues = ancestors.map((ancestor) => {
        return `<value uitype="incident">` + ancestor + `</value>`;
    }).join('');

    const fetchXml = `
    <fetch>
    <entity name="msdyn_ocliveworkitem">
        <attribute name="activityid" />
        <attribute name="description" />
        <attribute name="msdyn_channel" />
        <attribute name="msdyn_createdon" />
        <attribute name="msdyn_title" />
        <attribute name="subject" />
        <attribute name="activitytypecode" />
        <attribute name="createdon" />
        <attribute name="modifiedon" />
        <attribute name="community" />
        <attribute name="msdyn_activeagentid" />
        <attribute name="msdyn_customer" />
        <attribute name="msdyn_customerlanguageid" />
        <attribute name="msdyn_customerlocale" />
        <attribute name="msdyn_languageid" />
        <attribute name="msdyn_transcriptcontrol" />
        <attribute name="sendermailboxid" />
        <attribute name="utcconversiontimezonecode" />
        <attribute name="regardingobjectid" />
        <filter type="and">
            <condition attribute="regardingobjectid" operator="in">
                ${filterValues}
            </condition>
        </filter>
        <order attribute="createdon" descending="true" />
        <link-entity name="msdyn_transcript" from="msdyn_liveworkitemidid" to="activityid">
        <link-entity name="annotation" from="objectid" to="msdyn_transcriptid" alias="annotation">
            <attribute name="annotationid" />
            <attribute name="documentbody" />
            <attribute name="filename" />
            <attribute name="mimetype" />
        </link-entity>
        </link-entity>
    </entity>
    </fetch>
    `;

    const query = `?fetchXml=${fetchXml}`;
    const response = await context.webAPI.retrieveMultipleRecords("msdyn_ocliveworkitem", query);
    if (response.entities.length > 0) {

        response.entities.forEach(entity => {
            if (entity["annotation.documentbody"]) {
                entity["annotation.documentbody"] = extractDocumentBodyContent(entity["annotation.documentbody"]);
            }
        });

        return response.entities.sort((a, b) => new Date(a["msdyn_createdon"]).getTime() - new Date(b["msdyn_createdon"]).getTime());
    } else {
        return [];
    }
}

export function getWhatsAppChatsTest(): ComponentFramework.WebApi.Entity[] {
    const entities = sampleData.map(entity => {
        if (entity["annotation.documentbody"]) {
            entity["annotation.documentbody"] = extractDocumentBodyContent(entity["annotation.documentbody"]);
        }
        return entity;
    });

    return entities.sort((a, b) => new Date(a["msdyn_createdon"]).getTime() - new Date(b["msdyn_createdon"]).getTime());
}

export function mapEntitiesToChatCardProps(entities: ComponentFramework.WebApi.Entity[]): IChatCardProps[] {
    return entities.map(entity => {

        const chatMessages: IChatMessageProps[] = (entity["annotation.documentbody"] || [])

            .map((message: IChatMessageProps) => ({
                context: {} as ComponentFramework.Context<IInputs>, // Provide the actual context if available
                created: message.created,
                isControlMessage: message.isControlMessage,
                content: message.content,
                createdDateTime: message.createdDateTime,
                deleted: message.deleted,
                id: message.id,
                contentType: message.contentType,
                from: message.from,
                attachments: message.attachments,
                tags: message.tags,
                deliveryMode: message.deliveryMode,
                fromUserId: message.fromUserId,
                isBridged: message.isBridged,
            }))
            .sort((a: { createdDateTime: string | number | Date; }, b: { createdDateTime: string | number | Date; }) => new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime());

        return {
            context: {} as ComponentFramework.Context<IInputs>, // Provide the actual context if available
            chatMessages: chatMessages,
            etag: entity["@odata.etag"],
            subject: entity["subject"],
            activityid: entity["activityid"],
            title: entity["msdyn_title"],
            createdOnFormatted: new Date(entity["msdyn_createdon"]).toLocaleString(),
            createdOn: entity["msdyn_createdon"],
            channelFormatted: entity["msdyn_channel"],
            channel: entity["msdyn_channel"],
            annotationIdAttribute: "annotationid",
            annotationId: entity["annotation.annotationid"],
            documentBodyAttribute: "documentbody",
            documentBody: entity["annotation.documentbody"],
            filenameAttribute: "filename",
            filename: entity["annotation.filename"],
            modifiedOnFormatted: entity["modifiedon@OData.Community.Display.V1.FormattedValue"],
            modifiedOn: entity["modifiedon"],
            activityTypeCodeFormatted: entity["activitytypecode@OData.Community.Display.V1.FormattedValue"],
            activityTypeCode: entity["activitytypecode"],
            customerLocale: entity["msdyn_customerlocale"],
            activeAgentIdFormatted: entity["_msdyn_activeagentid_value@OData.Community.Display.V1.FormattedValue"],
            activeAgentId: entity["_msdyn_activeagentid_value"],
            customerValueFormatted: entity["_msdyn_customer_value@OData.Community.Display.V1.FormattedValue"],
            customerIdFormatted: entity["_msdyn_customer_value@OData.Community.Display.V1.FormattedValue"],
            customerId: entity["_msdyn_customer_value"],
            customerLanguageIdFormatted: entity["_msdyn_customerlanguageid_value@OData.Community.Display.V1.FormattedValue"],
            customerLanguageId: entity["_msdyn_customerlanguageid_value"],
        };
    });
}
