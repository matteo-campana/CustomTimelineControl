import * as React from "react";
import { EmailCard, IEmailCardProps } from "./EmailCard";
import {
    makeStyles,
    tokens
} from "@fluentui/react-components";
import { IInputs } from "./generated/ManifestTypes";

// Define the ITimelineProps interface
interface ITimelineProps {
    context: ComponentFramework.Context<IInputs>;
}

const useStyles = makeStyles({
    main: {
        padding: "8",
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        flex: "1 1 auto",
        overflowY: "auto",
        height: "100%",
    },
});

const generateFakeEmails = (): IEmailCardProps[] => {
    return [
        {
            from: "john.doe@example.com",
            sent: "2023-10-01 10:00 AM",
            to: "jane.doe@example.com",
            subject: "Meeting Reminder",
            content: "<p>Don't forget about our meeting tomorrow at 10 AM.</p>",
            createdOn: new Date("2023-09-30T09:00:00"),
            modifiedOn: new Date("2023-09-30T09:30:00"),
            isVisualized: false,
        },
        {
            from: "jane.doe@example.com",
            sent: "2023-10-01 11:00 AM",
            to: "john.doe@example.com",
            subject: "Re: Meeting Reminder",
            content: "<p>Got it! See you then.</p>",
            createdOn: new Date("2023-09-30T10:00:00"),
            modifiedOn: new Date("2023-09-30T10:15:00"),
            isVisualized: false,
        },
        {
            from: "alice.smith@example.com",
            sent: "2023-10-02 09:00 AM",
            to: "bob.jones@example.com",
            subject: "Project Update",
            content: "<p>The project is on track for completion by the end of the month.</p>",
            createdOn: new Date("2023-10-01T08:00:00"),
            modifiedOn: new Date("2023-10-01T08:30:00"),
            isVisualized: true,
        },
        {
            from: "bob.jones@example.com",
            sent: "2023-10-02 10:00 AM",
            to: "alice.smith@example.com",
            subject: "Re: Project Update",
            content: "<p>Thanks for the update. Let's discuss in our next meeting.</p>",
            createdOn: new Date("2023-10-01T09:00:00"),
            modifiedOn: new Date("2023-10-01T09:15:00"),
            isVisualized: true,
        },
        {
            from: "carol.white@example.com",
            sent: "2023-10-03 08:00 AM",
            to: "dave.black@example.com",
            subject: "New Hire Orientation",
            content: "<p>Welcome to the team! Your orientation is scheduled for tomorrow at 9 AM.</p>",
            createdOn: new Date("2023-10-02T07:00:00"),
            modifiedOn: new Date("2023-10-02T07:30:00"),
            isVisualized: true,
        },
        {
            from: "dave.black@example.com",
            sent: "2023-10-03 09:00 AM",
            to: "carol.white@example.com",
            subject: "Re: New Hire Orientation",
            content: "<p>Thank you! Looking forward to it.</p>",
            createdOn: new Date("2023-10-02T08:00:00"),
            modifiedOn: new Date("2023-10-02T08:15:00"),
            isVisualized: true,
        },
        {
            from: "eve.green@example.com",
            sent: "2023-10-04 07:00 AM",
            to: "frank.blue@example.com",
            subject: "Weekly Report",
            content: "<p>Please find the weekly report attached.</p>",
            createdOn: new Date("2023-10-03T06:00:00"),
            modifiedOn: new Date("2023-10-03T06:30:00"),
            isVisualized: true,
        },
        {
            from: "frank.blue@example.com",
            sent: "2023-10-04 08:00 AM",
            to: "eve.green@example.com",
            subject: "Re: Weekly Report",
            content: "<p>Received, thank you!</p>",
            createdOn: new Date("2023-10-03T07:00:00"),
            modifiedOn: new Date("2023-10-03T07:15:00"),
            isVisualized: true,
        },
    ];
};

const Timeline: React.FC<ITimelineProps> = (props) => {
    const [emails, setEmails] = React.useState<IEmailCardProps[]>(generateFakeEmails());
    const styles = useStyles();

    // React.useEffect(() => {
    //     if (props.context.webAPI) {
    //         getAllEmails().then(fetchedEmails => {
    //             setEmails(fetchedEmails);
    //             return fetchedEmails;
    //         }).catch(error => {
    //             console.error("Error fetching emails:", error);
    //             alert("Error fetching emails: " + error);
    //         });
    //     } else {
    //         setEmails(generateFakeEmails());
    //     }
    // }, []);

    // const getAllEmails = (): Promise<IEmailCardProps[]> => {
    //     const query = "?$select=torecipients,createdon,subject,description,modifiedon";
    //     return props.context.webAPI.retrieveMultipleRecords("email", query).then(
    //         (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
    //             console.log("Emails retrieved:", response.entities);
    //             alert("Emails retrieved: " + response.entities.map(entity => entity.subject).join("\n"));
    //             return response.entities.map(entity => ({
    //                 from: entity.torecipients,
    //                 sent: entity["createdon@OData.Community.Display.V1.FormattedValue"],
    //                 to: entity.torecipients,
    //                 subject: entity.subject,
    //                 content: entity.description,
    //                 createdOn: new Date(entity.createdon),
    //                 modifiedOn: new Date(entity.modifiedon),
    //                 isVisualized: true,
    //             }));
    //         },
    //         (errorResponse) => {
    //             console.error("Error retrieving emails:", errorResponse);
    //             return [];
    //         }
    //     );
    // };

    return (
        <div className={styles.main}>
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
                    //style={{ backgroundColor: index % 2 === 0 ? tokens.colorNeutralBackground1 : tokens.colorNeutralBackground1Pressed }}
                />
            ))}
        </div>
    );
};

export { Timeline };
