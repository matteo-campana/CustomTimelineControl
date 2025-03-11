/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    makeStyles
} from "@fluentui/react-components";
import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

export interface IChatMessageProps {
    style?: React.CSSProperties;
    context: ComponentFramework.Context<IInputs>;
    created: string;
    isControlMessage: boolean;
    content: string;
    createdDateTime: string;
    deleted: boolean;
    id: string;
    contentType?: string;
    from?: {
        application?: {
            displayName?: string;
            id?: string;
        };
    };
    attachments?: any[];
    tags?: string;
    deliveryMode?: string;
    fromUserId?: string;
    isBridged?: string;
}

const useStyles = makeStyles({
});

export const ChatMessage: React.FC<IChatMessageProps> = (props) => {
    const classes = useStyles();

    return (
        <></>
    );
};
