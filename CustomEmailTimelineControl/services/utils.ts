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

    if (context.parameters.DebugMode.raw === true) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let entityId = (context.mode as any)?.contextInfo?.entityId;
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

export async function getCaseIds(context: ComponentFramework.Context<IInputs>): Promise<string[]> {

    if (context.parameters.DebugMode.raw === true) {
        return [];
    }

    const collectCurrent = context.parameters.CollectCurrentRecord.raw;
    const collectParent = context.parameters.CollectParent.raw;
    const collectAncestors = context.parameters.CollectAncestor.raw;

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

    return ancestors;
}