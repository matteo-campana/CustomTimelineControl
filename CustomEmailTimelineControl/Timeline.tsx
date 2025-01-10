import * as React from "react";
import { EmailCard, IEmailCardProps } from "./EmailCard";
import {
    makeStyles
} from "@fluentui/react-components";

// Define the ITimelineProps interface
interface ITimelineProps {
    initialEmails?: IEmailCardProps[];
}

const useStyles = makeStyles({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        columnGap: "16px",
        rowGap: "8px",
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
        },
        {
            from: "jane.doe@example.com",
            sent: "2023-10-01 11:00 AM",
            to: "john.doe@example.com",
            subject: "Re: Meeting Reminder",
            content: "<p>Got it! See you then.</p>",
            createdOn: new Date("2023-09-30T10:00:00"),
            modifiedOn: new Date("2023-09-30T10:15:00"),
        },
        // Add more fake emails as needed
    ];
};

const Timeline: React.FC<ITimelineProps> = (props) => {
    // const [emails, setEmails] = React.useState<IEmailCardProps[]>(props.initialEmails || generateFakeEmails());
    const [emails, setEmails] = React.useState<IEmailCardProps[]>(generateFakeEmails());
    const styles = useStyles();

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
                />
            ))}
        </div>
    );
};

export { Timeline };
