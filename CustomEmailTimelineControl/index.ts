import { IInputs, IOutputs } from "./generated/ManifestTypes";
// import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import { Timeline } from './Timeline';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import * as React from "react";
import EmailGrid from './EmailGrid';
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class CustomEmailTimelineControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    // Reference to ComponentFramework Context object
    private _context: ComponentFramework.Context<IInputs>;
    private _emailMessageCollection: ComponentFramework.WebApi.Entity[];

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._context = context;
        // context.mode.trackContainerResize(true);
        this._emailMessageCollection = [];

        this.getCurrentEntityData();
        this.getAllEmails().then(emails => {
            this._emailMessageCollection = emails;
            return emails;
        }).catch(error => {
            console.error("Error retrieving emails:", error);
        });
    }

    private getCurrentEntityData(): Promise<ComponentFramework.WebApi.Entity | null> {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let entityId = (this._context.mode as any).contextInfo.entityId;
        entityId = entityId.replace("{", "").replace("}", "");

        return this._context.webAPI.retrieveRecord("incident", entityId, "?$select=incidentid,_parentcaseid_value").then(
            (response) => {
                // console.log("Parent case ID retrieved:", response);
                // console.table(response);
                return response;
            },
            (errorResponse) => {
                console.error("Error retrieving parent case ID:", errorResponse);
                // alert("Error retrieving parent case ID: " + errorResponse);
                return null;
            }
        );
    }

    /**
     * Retrieves all emails.
     * @returns Promise resolving to an array of email records.
     */
    private async getAllEmails(): Promise<ComponentFramework.WebApi.Entity[]> {

        const ancestors = await this.getCurrentEntityData().then((entity) => {
            if (entity) {
                return [entity.incidentid, entity._parentcaseid_value];
            } else {
                return [];
            }
        });

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
        return this._context.webAPI.retrieveMultipleRecords("email", query).then(
            (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
                console.log("Emails retrieved:", response.entities);
                console.table(response.entities);
                return response.entities;
            },
            (errorResponse) => {
                console.error("Error retrieving emails:", errorResponse);
                alert("Error retrieving emails: " + errorResponse);
                return [];
            }
        );
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        // const props: IHelloWorldProps = { name: 'Power Apps' };
        // return React.createElement(
        //     HelloWorld, props
        // );

        return React.createElement(FluentProvider, { theme: webLightTheme },
            React.createElement(Timeline, { emailMessageCollection : this._emailMessageCollection, context: this._context })
            // React.createElement(EmailGrid, { context: this._context })
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

}
