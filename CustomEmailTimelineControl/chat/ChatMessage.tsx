/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardHeader,
    makeStyles
} from "@fluentui/react-components";
import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

import {
    Text
} from "@fluentui/react-components";
import { CalendarDateRegular, PersonChatRegular } from "@fluentui/react-icons";

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
        marginBottom: '10px',
    },
    messageCard: {
        maxWidth: '80%',
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
    },

});

export const ChatMessage: React.FC<IChatMessageProps> = (props) => {
    const classes = useStyles();

    return (
        <section>
            {props.contentType === 'text' ? (
                <section>
                    <section>
                        {props.from?.application?.displayName ? <Text underline><PersonChatRegular /> {props.from?.application?.displayName}</Text> : <></>}
                        {props.from?.user?.displayName ? <Text underline><PersonChatRegular /> {props.from?.user?.displayName}</Text> : <></>}
                        <Text><CalendarDateRegular />{new Date(props.createdDateTime).toLocaleString()}</Text>
                    </section>
                    <Card className={classes.messageCard}>
                        <CardHeader className={classes.header}
                            // header={

                            // }
                            description={
                                <Text>{props.content}</Text>
                            }
                        ></CardHeader>
                    </Card>
                </section>
            ) : <></>}
        </section>
    );
};
