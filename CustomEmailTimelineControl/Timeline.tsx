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
import { getWhatsAppChatsTest, mapEntitiesToChatCardProps } from './services/whatsappChatService';

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
        overflow: "auto",
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
    const [mergedItems, setMergedItems] = React.useState<any[]>([]);
    const styles = useStyles();

    React.useEffect(() => {
        if (props.loading) {
            setEmails([]);
            setWhatsAppChats([]);
            setMergedItems([]);
        } else {
            if (props.context.parameters.DebugMode.raw === true) {
                let transformedEmails = generateEmailsFromJson();
                let transformedWhatsAppChats = mapEntitiesToChatCardProps(getWhatsAppChatsTest());

                transformedEmails = transformedEmails.map(email => ({ ...email, recordType: 'email' }));
                transformedWhatsAppChats = transformedWhatsAppChats.map(chat => ({ ...chat, recordType: 'whatsapp' }));

                setEmails(transformedEmails);
                setWhatsAppChats(transformedWhatsAppChats);
                setMergedItems([...transformedEmails, ...transformedWhatsAppChats].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()));

                props.context.factory.requestRender();
            } else {
                let transformedEmails = transformRawEmailMessages(props.emailMessageCollection);
                let transformedWhatsAppChats = mapEntitiesToChatCardProps(props.whatsAppChatCollection);

                transformedEmails = transformedEmails.map(email => ({ ...email, recordType: 'email' }));
                transformedWhatsAppChats = transformedWhatsAppChats.map(chat => ({ ...chat, recordType: 'whatsapp' }));

                setEmails(transformedEmails);
                setWhatsAppChats(transformedWhatsAppChats);
                setMergedItems([...transformedEmails, ...transformedWhatsAppChats].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()));
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
            ) : (mergedItems.length === 0) ? (
                <Label size="medium" style={{ textAlign: "center", padding: "16px" }}>
                    {props.context.parameters.CollectEmails.raw === true && props.context.parameters.CollectWhatsAppChats.raw === false ? props.context.resources.getString("NoEmails") : <></>}
                    {props.context.parameters.CollectEmails.raw === false && props.context.parameters.CollectWhatsAppChats.raw === true ? props.context.resources.getString("NoWhatsAppChats") : <></>}
                    {props.context.parameters.CollectEmails.raw === true && props.context.parameters.CollectWhatsAppChats.raw === true ? props.context.resources.getString("NoEmailsOrWhatsAppChats") : <></>}
                </Label>
            ) : (
                <>
                    {mergedItems.map((item, index) => (
                        item.recordType === 'whatsapp' ? <ChatCard key={index} {...item} context={props.context} /> : <EmailCard key={index} {...item} context={props.context} />
                    ))}
                </>
            )}
        </div>
    );
};

export { Timeline };

