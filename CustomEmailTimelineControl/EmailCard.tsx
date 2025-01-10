import * as React from "react";
import {
    Text,
    Card,
    CardHeader,
    CardFooter,
    Button,
    Caption1,
    Body1,
    Avatar,
    makeStyles,
    tokens,
} from "@fluentui/react-components";

import { MoreHorizontal20Regular } from "@fluentui/react-icons";


export interface IEmailCardProps {
    from: string;
    sent: string;
    to: string;
    subject: string;
    content: string;
    createdOn: Date;
    modifiedOn: Date;
}

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    card: {
        display: "flex",
        flexDirection: "column",
    },
});

export const EmailCard: React.FC<IEmailCardProps> = (props) => {
    const onClick = React.useCallback(() => console.log("Interactive!"), []);
    const styles = useStyles();
    return (
        <Card
            {...props}
            onClick={onClick}
            className={styles.card}
        >
            <CardHeader
                image={
                    <Avatar
                        aria-label="Guest"
                        name={props.from}
                        size={48}
                        shape="circular"
                        image={{
                            src: "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg",
                        }}
                    />
                }
                header={
                    <Body1 className={styles.header}>
                        <Text>From: {props.from}</Text>
                        <Text>To: {props.to}</Text>
                        <Text>Sent: {props.sent}</Text>
                    </Body1>
                }
                // description={

                // }
                action={
                    <Button
                        appearance="transparent"
                        icon={<MoreHorizontal20Regular />}
                        aria-label="More options"
                    />
                }
            />

            <div style={{ marginBottom: "8px" }}>
                <Caption1>
                    <Text>Subject: {props.subject}</Text>
                </Caption1>
                <Text>Content:</Text>
                <div dangerouslySetInnerHTML={{ __html: props.content }} />
            </div>

            <CardFooter >
                <Body1 className={styles.footer}>
                    <Text>Created On: {props.createdOn.toLocaleString()}</Text>
                    <Text>Modified On: {props.modifiedOn.toLocaleString()}</Text>
                </Body1>
            </CardFooter>
        </Card>
    );
};
