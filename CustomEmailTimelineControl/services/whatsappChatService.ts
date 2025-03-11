import { IInputs } from "../generated/ManifestTypes";
import sampleData from "../sample-whatsapp-chat.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDocumentBodyContent(base64String: string): any {
    const decodedString = atob(base64String);
    // console.log("Decoded string:", decodedString);
    const parsedContent = JSON.parse(decodedString);
    if (Array.isArray(parsedContent) && parsedContent.length > 0 && parsedContent[0].Content) {
        return JSON.parse(parsedContent[0].Content);
    }
    return parsedContent;
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
        console.table(response.entities);
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
    console.table(entities);
    return entities;
}
