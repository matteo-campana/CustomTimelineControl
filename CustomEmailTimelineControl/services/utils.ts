import { IInputs } from "../generated/ManifestTypes";

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