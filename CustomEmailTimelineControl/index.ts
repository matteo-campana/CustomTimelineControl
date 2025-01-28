import { IInputs, IOutputs } from "./generated/ManifestTypes";
// import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import { Timeline } from './Timeline';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { getCurrentEntityData, getIncidentEntityData, getAllEmails } from './services/emailService';
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class CustomEmailTimelineControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    // Reference to ComponentFramework Context object
    private _context: ComponentFramework.Context<IInputs>;
    private _emailMessageCollection: ComponentFramework.WebApi.Entity[];
    private _emailLoadInProgress: boolean = true;
    private _state: ComponentFramework.Dictionary;

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
        this._state = state;

        this._emailMessageCollection = [];
        this._emailLoadInProgress = true;

        // Check if we are in debug mode and set a timer to simulate loading
        if (context.parameters.DebugMode.raw == true) {
            setInterval(() => {
                this._emailLoadInProgress = false;
                this.notifyOutputChanged(); // Notify the framework that the data has changed
                this._context.factory.requestRender();
            }, 3000);
        }

        if (context.parameters.DebugMode.raw == false) {
            getCurrentEntityData(this._context)
                .then(() => getAllEmails(this._context))
                .then(emails => {
                    this._emailMessageCollection = emails;
                    this._emailLoadInProgress = false;
                    this.notifyOutputChanged(); // Notify the framework that the data has changed
                    this._context.factory.requestRender();
                    return emails;
                })
                .catch(error => {
                    console.error("Error retrieving emails:", error);
                });
        }

        this._context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        console.log("updateView called with context:", context.mode.allocatedHeight, context.mode.allocatedWidth);

        return React.createElement(FluentProvider, { theme: webLightTheme },
            React.createElement(
                Timeline, {
                emailMessageCollection: this._emailMessageCollection,
                context: this._context,
                width: context.mode.allocatedWidth == null ? "100%" : context.mode.allocatedWidth - 8 + "px",
                loading: this._emailLoadInProgress
            })
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            emailMessageCollection: JSON.stringify(this._emailMessageCollection),
            loading: this._emailLoadInProgress
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

}
