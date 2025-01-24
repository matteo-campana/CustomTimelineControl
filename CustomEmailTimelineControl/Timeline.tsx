/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Label,
    makeStyles,
    Spinner
} from "@fluentui/react-components";
import * as React from "react";
import { EmailCard, IEmailCardProps } from "./EmailCard";
import { IInputs } from "./generated/ManifestTypes";
import sampleEmails from "./sample_email.json";

// Define the ITimelineProps interface
interface ITimelineProps {
    emailMessageCollection: ComponentFramework.WebApi.Entity[];
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

const generateEmailsFromJson = (): IEmailCardProps[] => {
    return sampleEmails.map((email: any) => {
        const fromParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 1);
        const toParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 2);
        return {
            from: fromParty ? fromParty.addressused : "unknown",
            sent: new Date(email.createdon).toLocaleString(),
            to: toParty ? toParty.addressused : "unknown",
            subject: email.subject,
            content: email.description,
            createdOn: new Date(email.createdon),
            modifiedOn: new Date(email.modifiedon),
            isVisualized: email.statuscode === 6,
            emailId: email.activityid,
        };
    });
};

const transformRawEmailMessages = (emailMessages: ComponentFramework.WebApi.Entity[]): IEmailCardProps[] => {
    return emailMessages.map((email) => {
        const fromParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 1);
        const toParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 2);
        return {
            from: fromParty ? fromParty.addressused : "unknown",
            sent: new Date(email.createdon).toLocaleString(),
            to: toParty ? toParty.addressused : "unknown",
            subject: email.subject,
            content: email.description,
            createdOn: new Date(email.createdon),
            modifiedOn: new Date(email.modifiedon),
            isVisualized: email.statuscode === 6,
            emailId: email.activityid,
        };
    });
};

const Timeline: React.FC<ITimelineProps> = (props) => {
    const [emails, setEmails] = React.useState<IEmailCardProps[]>([]);
    const styles = useStyles();

    React.useEffect(() => {
        if (props.loading) {
            setEmails([]);
        } else {
            if (props.context.parameters.DebugMode.raw === true) {
                const transformedEmails = generateEmailsFromJson();
                setEmails(transformedEmails);
            } else {
                const transformedEmails = transformRawEmailMessages(props.emailMessageCollection);
                setEmails(transformedEmails);
            }
        }
    }, [props.context.parameters.DebugMode.raw, props.emailMessageCollection, props.loading]);

    return (
        <div className={styles.main}
            style={{ width: `${props.width}` }}
        >
            {props.loading ? (
                <Spinner appearance="primary" label="Loading parent case email messages..." />
            ) : (emails.length === 0) ? (
                <Label size="medium" style={{ textAlign: "center", padding: "16px" }}>
                    There are no e-mails available for the parent case.
                </Label>
            ) : (
                emails.map((email, index) => (
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
                    />
                ))
            )}
        </div>
    );
};

export { Timeline };

