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
    transcriptContainer: {
        padding: "16px", // Add padding to the chat card
        margin: "16px", // Remove margin from the chat card
        maxHeight: "100px", // Add max height for overflow
        overflowY: "hidden", // Hide overflow
    },
    expandedTranscriptContainer: {
        padding: "16px", // Add padding to the chat card
        margin: "16px", // Remove margin from the chat card
        maxHeight: "none", // Remove max height for expanded view
        overflowY: "auto", // Enable overflow
    },
});

export const ChatCard: React.FC<IChatCardProps> = (props: IChatCardProps) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const transcriptRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (transcriptRef.current) {
            setIsOverflowing(true);
        }
    }, [props.chatMessages]);

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


            <div ref={transcriptRef} className={isExpanded ? classes.expandedTranscriptContainer : classes.transcriptContainer}>
                {isExpanded && (
                    <>
                        <Text weight="semibold">Transcript</Text>
                        <Card>
                            {props.chatMessages.map((message, index) => (
                                <ChatMessage key={index} {...message} />
                            ))}
                        </Card>
                    </>
                )}
            </div>
            {isOverflowing && (
                <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Hide Transcript" : "Show Transcript"}
                </ToggleButton>
            )}
            <CardFooter></CardFooter>
        </Card>
    );
};