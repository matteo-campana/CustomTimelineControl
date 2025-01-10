import * as React from "react";
import { EmailCard, IEmailCardProps } from "./EmailCard";

// Define the ITimelineProps interface
interface ITimelineProps {
    initialEmails?: IEmailCardProps[];
}
import {
    makeStyles,
    Button,
    Caption1,
    Body1,
    Subtitle1,
} from "@fluentui/react-components";
import {
    MoreHorizontal20Regular,
    Open16Regular,
    Share16Regular,
} from "@fluentui/react-icons";
import {
    Card,
    CardHeader,
    CardFooter,
    CardPreview,
    CardProps,
} from "@fluentui/react-components";

const resolveAsset = (asset: string) => {
    const ASSET_URL =
        "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/";

    return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        columnGap: "16px",
        rowGap: "36px",
    },

    title: { margin: "0 0 12px" },

    description: { margin: "0 0 12px" },

    card: {
        width: "400px",
        maxWidth: "100%",
        height: "fit-content",
    },

    text: { margin: "0" },
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
