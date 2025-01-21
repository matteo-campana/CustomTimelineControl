/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { EmailCard, IEmailCardProps } from "./EmailCard";
import {
    makeStyles,
    tokens,
    Label,
    Spinner,
} from "@fluentui/react-components";
import { IInputs } from "./generated/ManifestTypes";
// import sampleEmails from "./sample_email.json";

// Define the ITimelineProps interface
interface ITimelineProps {
    emailMessageCollection: ComponentFramework.WebApi.Entity[];
    context: ComponentFramework.Context<IInputs>;
    width: string;
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
    },
});

// const generateEmailsFromJson = (): IEmailCardProps[] => {
//     return sampleEmails.map((email: any) => {
//         const fromParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 1);
//         const toParty = email.email_activity_parties.find((party: any) => party.participationtypemask === 2);
//         return {
//             from: fromParty ? fromParty.addressused : "unknown",
//             sent: new Date(email.createdon).toLocaleString(),
//             to: toParty ? toParty.addressused : "unknown",
//             subject: email.subject,
//             content: email.description,
//             createdOn: new Date(email.createdon),
//             modifiedOn: new Date(email.modifiedon),
//             isVisualized: email.statuscode === 6,
//         };
//     });
// };

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
        };
    });
};

const Timeline: React.FC<ITimelineProps> = (props) => {
    const [emails, setEmails] = React.useState<IEmailCardProps[]>([]);
    const [loading, setLoading] = React.useState(true);
    const styles = useStyles();

    // React.useEffect(() => {
    //     setLoading(true);
    //     const transformedEmails = generateEmailsFromJson();
    //     setEmails(transformedEmails);
    //     setLoading(false);
    // }, []); // Re-run effect when container size changes

    React.useEffect(() => {
        setLoading(true);
        const transformedEmails = transformRawEmailMessages(props.emailMessageCollection);
        setEmails(transformedEmails);
        setLoading(false);
    }, [props.emailMessageCollection]);

    return (
        <div className={styles.main}
            style={{ width: `${props.width}` }}
            >
            {loading ? (
                <Spinner appearance="primary" label="Loading parent case email messages..." />
            ) : emails.length === 0 ? (
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
                    //style={{ backgroundColor: index % 2 === 0 ? tokens.colorNeutralBackground1 : tokens.colorNeutralBackground1Pressed }}
                    />
                ))
            )}
        </div>
    );
};

export { Timeline };
