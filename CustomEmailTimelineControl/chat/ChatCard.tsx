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

import { AttachText20Regular, ChatEmptyRegular, MoreHorizontal20Regular, PersonChatRegular } from "@fluentui/react-icons";
import DOMPurify from 'dompurify';
import { ChatMessage } from "./ChatMessage";

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
    modifiedOnFormatted: string;
    modifiedOn: string;
    activityTypeCodeFormatted: string;
    activityTypeCode: string;
    customerValueFormatted: string;
    customerLocale: string;
    activeAgentIdFormatted: string;
    activeAgentId: string;
    customerIdFormatted: string;
    customerId: string;
    customerLanguageIdFormatted: string;
    customerLanguageId: string;
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
                        <Text weight="regular">Created on: {props.createdOnFormatted}</Text>
                        <Text weight="semibold">
                            <ChatEmptyRegular /> WhatsApp from: <PersonChatRegular /> {props.customerValueFormatted}</Text>
                        <Text underline>{props.title}</Text>
                        <Text weight="regular">Last Updated: {props.modifiedOnFormatted}</Text>
                    </div>
                }

                description={
                    <Text></Text>
                }
            />

            <CardPreview>
                <Card>
                    {props.chatMessages.map((message, index) => (
                        <ChatMessage key={index} {...message} />
                    ))}
                </Card>
            </CardPreview>
            <CardFooter></CardFooter>
        </Card>
    );
};