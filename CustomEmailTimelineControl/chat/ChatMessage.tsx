/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    makeStyles
} from "@fluentui/react-components";
import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

import {
    Text
} from "@fluentui/react-components";
import { ClockRegular, PersonChatRegular } from "@fluentui/react-icons";

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
        user?: {
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
    messageContainer: {
        display: 'flex',
    },
    messageCard: {
        maxWidth: '80%',
    },
    applicationMessage: {
        justifyContent: 'flex-start',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    systemMessage: {
        justifyContent: 'flex-start',
    },
});

export const ChatMessage: React.FC<IChatMessageProps> = (props) => {
    const classes = useStyles();

    return (
        <section>
            {props.contentType === 'text' && !props.tags?.startsWith('system,error_details') ? (
                <section className={`${classes.messageContainer} ${props.from?.user && (props.tags?.startsWith('public') || props.tags?.startsWith('ChannelId-whatsapp')) ? classes.userMessage : classes.applicationMessage}`}>
                    <div>
                        <section>
                            {props.from?.application?.displayName ? <Text underline><PersonChatRegular /> {props.from?.application?.displayName}</Text> : <></>}
                            {props.from?.user?.displayName ? <Text underline><PersonChatRegular /> {props.from?.user?.displayName}</Text> : <></>}
                            <Text>&nbsp;</Text>
                            <Text><ClockRegular /> {new Date(props.createdDateTime).toLocaleString()}</Text>
                        </section>
                        {props.tags?.startsWith('public') || props.tags?.startsWith('ChannelId-whatsapp') ?
                            <Card className={classes.messageCard}>
                                <Text>{props.content}</Text>
                            </Card> : <Text>{props.content}</Text>}
                    </div>
                </section>
            ) : <></>}
        </section>
    );
};
