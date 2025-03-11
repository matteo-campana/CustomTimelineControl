import {
    makeStyles
} from "@fluentui/react-components";
import * as React from "react";

import { IInputs } from "../generated/ManifestTypes";
import { IChatMessageProps } from "./ChatMessage";

export interface IChatCardProps {
    style?: React.CSSProperties;
    context: ComponentFramework.Context<IInputs>;
    chatMessages: IChatMessageProps[];
    etag: string;
    subject: string;
    activityid: string;
    title: string;
    createdOnFormatted: string;
    createdOn: string;
    channelFormatted: string;
    channel: string;
    annotationIdAttribute: string;
    annotationId: string;
    documentBodyAttribute: string;
    documentBody: string;
    filenameAttribute: string;
    filename: string;
}

const useStyles = makeStyles({

});

export const ChatCard: React.FC<IChatCardProps> = (props) => {
    return (
        <>TEST</>
    );
};
