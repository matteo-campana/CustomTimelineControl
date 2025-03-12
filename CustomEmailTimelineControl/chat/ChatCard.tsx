import {
    CardPreview,
    makeStyles
} from "@fluentui/react-components";
import * as React from "react";

import { IInputs } from "../generated/ManifestTypes";
import { IChatMessageProps } from "./ChatMessage";

import {
    Avatar,
    Body1,
    Caption1,
    Card,
    CardFooter,
    CardHeader,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Text,
    ToggleButton,
    Tooltip,
    useIsOverflowItemVisible,
    useOverflowMenu
} from "@fluentui/react-components";

import { AttachText20Regular, MoreHorizontal20Regular } from "@fluentui/react-icons";
import DOMPurify from 'dompurify';

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
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});

export const ChatCard: React.FC<IChatCardProps> = (props: IChatCardProps) => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader 
                header={
                    <div className={classes.header}>
                        <Text>Created on: {props.createdOnFormatted}</Text>
                        <Text> WhatsApp from: igor salvadorClosed</Text>
                        <Text>{props.title}</Text>
                    </div>
                }

                description={
                    <Text>Channel: {props.channelFormatted}</Text>
                }
            />


            <CardPreview></CardPreview>
            <CardFooter></CardFooter>
        </Card>
    );
};