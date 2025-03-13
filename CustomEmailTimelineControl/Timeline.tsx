/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Label,
    makeStyles,
    Spinner
} from "@fluentui/react-components";
import * as React from "react";
import { ChatCard, IChatCardProps } from "./chat/ChatCard";
import { EmailCard, IEmailCardProps } from "./EmailCard";
import { IInputs } from "./generated/ManifestTypes";
import { generateEmailsFromJson, transformRawEmailMessages } from './services/emailService';
import { mapEntitiesToChatCardProps } from './services/whatsappChatService';

// Define the ITimelineProps interface
interface ITimelineProps {
    emailMessageCollection: ComponentFramework.WebApi.Entity[];
    whatsAppChatCollection: ComponentFramework.WebApi.Entity[];
    context: ComponentFramework.Context<IInputs>;
    width: string;
    loading: boolean;
}

const useStyles = makeStyles({
    main: {
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        flex: "1 1 auto",
        overflow: "auto", // Ensure vertical overflow is handled
        // height: "900px",
        height: "100%",
        width: "100%",
        marginLeft: "4px",
        marginTop: "4px",
        marginBottom: "4px",
    },
});

const Timeline: React.FC<ITimelineProps> = (props) => {
    const [emails, setEmails] = React.useState<IEmailCardProps[]>([]);
    const [whatsAppChats, setWhatsAppChats] = React.useState<IChatCardProps[]>([]);
    const styles = useStyles();

    React.useEffect(() => {
        if (props.loading) {
            setEmails([]);
            setWhatsAppChats([]);
        } else {
            if (props.context.parameters.DebugMode.raw === true) {
                const transformedEmails = generateEmailsFromJson();
                const transformedWhatsAppChats = mapEntitiesToChatCardProps(props.whatsAppChatCollection);

                setEmails(transformedEmails);
                setWhatsAppChats(transformedWhatsAppChats);

                props.context.factory.requestRender();
            } else {
                const transformedEmails = transformRawEmailMessages(props.emailMessageCollection);
                const transformedWhatsAppChats = mapEntitiesToChatCardProps(props.whatsAppChatCollection);

                setEmails(transformedEmails);
                setWhatsAppChats(transformedWhatsAppChats);
                props.context.factory.requestRender();
            }
        }
    }, [props.context.parameters.DebugMode.raw, props.emailMessageCollection, props.loading]);

    return (
        <div className={styles.main}
            style={{ width: `${props.width}` }}
        >
            {props.loading ? (
                <Spinner appearance="primary" label={props.context.resources.getString("Loading")} />
            ) : (emails.length === 0) ? (
                <Label size="medium" style={{ textAlign: "center", padding: "16px" }}>
                    {props.context.resources.getString("NoEmails")}
                </Label>
            ) : (
                <>
                    {whatsAppChats.map((chat, index) => (
                        <ChatCard
                            key={index}
                            context={props.context}
                            chatMessages={chat.chatMessages}
                            etag={chat.etag}
                            subject={chat.subject}
                            activityid={chat.activityid}
                            title={chat.title}
                            createdOnFormatted={chat.createdOnFormatted}
                            createdOn={chat.createdOn}
                            channelFormatted={chat.channelFormatted}
                            channel={chat.channel}
                            annotationIdAttribute={chat.annotationIdAttribute}
                            annotationId={chat.annotationId}
                            documentBodyAttribute={chat.documentBodyAttribute}
                            documentBody={chat.documentBody}
                            filenameAttribute={chat.filenameAttribute}
                            filename={chat.filename}
                            modifiedOnFormatted={chat.modifiedOnFormatted}
                            modifiedOn={chat.modifiedOn}
                            activityTypeCodeFormatted={chat.activityTypeCodeFormatted}
                            activityTypeCode={chat.activityTypeCode}
                            customerValueFormatted={chat.customerValueFormatted}
                            customerLocale={chat.customerLocale}
                            activeAgentIdFormatted={chat.activeAgentIdFormatted}
                            activeAgentId={chat.activeAgentId}
                            customerIdFormatted={chat.customerIdFormatted}
                            customerId={chat.customerId}
                            customerLanguageIdFormatted={chat.customerLanguageIdFormatted}
                            customerLanguageId={chat.customerLanguageId}
                        />
                    ))}
                    {emails.map((email, index) => (
                        <EmailCard
                            key={index}
                            from={email.from}
                            sent={email.sent}
                            to={email.to}
                            subject={email.subject}
                            content={email.content}
                            createdOn={email.createdOn}
                            modifiedOn={email.modifiedOn}
                            isVisualized={email.isVisualized}
                            emailId={email.emailId}
                            context={props.context}
                            attachments={email.attachments}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export { Timeline };

