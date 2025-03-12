import { IInputs } from "../generated/ManifestTypes";
import sampleData from "../sample-whatsapp-chat.json";
import { IChatCardProps } from "../chat/ChatCard";
import { IChatMessageProps } from "../chat/ChatMessage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDocumentBodyContent(base64String: string): any {
    if (!base64String) {
        return [];
    }
    try{
        const decodedString = atob(base64String);
        const parsedString = JSON.parse(decodedString);
        return parsedString;
    }
    catch(e){
        console.error("Error while parsing document body content:", e);
        return [];
    }
}

export async function getWhatsAppChats(context: ComponentFramework.Context<IInputs>, caseId: string | null): Promise<ComponentFramework.WebApi.Entity[]> {
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
        ${caseId ? `
        <filter>
            <condition attribute="msdyn_ocliveworkitemid" operator="eq" value="${caseId}" />
        </filter>` : ''}
        <order attribute="createdon" descending="true" />
        <link-entity name="msdyn_transcript" from="msdyn_liveworkitemidid" to="activityid">
        <link-entity name="annotation" from="objectid" to="msdyn_transcriptid" alias="annotation">
            <attribute name="annotationid" />
            <attribute name="documentbody" />
            <attribute name="filename" />
        </link-entity>
        </link-entity>
    </entity>
    </fetch>
    `;

    const query = `?fetchXml=${fetchXml}`;
    const response = await context.webAPI.retrieveMultipleRecords("msdyn_ocliveworkitem", query);
    if (response.entities.length > 0) {
        // console.log("WhatsApp chats retrieved:", response.entities);
        response.entities.forEach(entity => {
            if (entity["annotation.documentbody"]) {
                entity["annotation.documentbody"] = extractDocumentBodyContent(entity["annotation.documentbody"]);
            }
        });
        console.log("WhatsApp chats retrieved:", response.entities);
        return response.entities;
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
    // console.log("WhatsApp chats (test) retrieved:", entities);
    // console.table(entities);
    return entities;
}

export function mapEntitiesToChatCardProps(entities: ComponentFramework.WebApi.Entity[]): IChatCardProps[] {
    return entities.map(entity => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chatMessages: IChatMessageProps[] = (entity["annotation.documentbody"] || []).map((message: any) => ({
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
        }));

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
        };
    });
}
