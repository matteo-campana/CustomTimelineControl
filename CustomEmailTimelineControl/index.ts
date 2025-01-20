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
    private _resultContainerDiv: HTMLDivElement;


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
        this._resultContainerDiv = document.createElement("div");
        this._resultContainerDiv.classList.add("resultContainer");
        context.mode.trackContainerResize(true);
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

        this.getAllEmails()

        return React.createElement(FluentProvider, { theme: webLightTheme },
            React.createElement(Timeline, { initialEmails: [] })
            // React.createElement(EmailGrid, { context: this._context })
        );

    }

    /**
     * Retrieves all emails.
     * @returns Promise resolving to an array of email records.
     */
    private getAllEmails(): Promise<ComponentFramework.WebApi.Entity[]> {
        const query = "?$select=from,to,subject,description,createdon,modifiedon";
        return this._context.webAPI.retrieveMultipleRecords("email", query).then(
            (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
                console.log("Emails retrieved:", response.entities);
                if (this._resultContainerDiv) {
                    alert("Emails retrieved: " + response.entities);
                    console.table(response.entities);
                }
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
