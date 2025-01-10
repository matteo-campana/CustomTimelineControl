import * as React from "react";
import {
    Text,
    Card,
    CardHeader,
    CardFooter,
    makeStyles,
    tokens,
    Button,
    Caption1,
    Subtitle1,
    Body1,
    mergeClasses,
    Avatar,
} from "@fluentui/react-components";

import { MoreHorizontal20Regular } from "@fluentui/react-icons";

const resolveAsset = (asset: string) => {
    const ASSET_URL =
        "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/";

    return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
    main: {
        gap: "36px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    },

    title: {
        margin: "0 0 12px", display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    description: {
        margin: "0 0 12px", display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    card: {
        // width: "480px",
        maxWidth: "100%",
        height: "fit-content",
    },

    caption: {
        color: tokens.colorNeutralForeground3,
    },

    logo: {
        borderRadius: "4px",
        width: "48px",
        height: "48px",
    },

    text: { margin: "0" },

    footerContent: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
});

export interface IEmailCardProps {
    from: string;
    sent: string;
    to: string;
    subject: string;
    content: string;
    createdOn: Date;
    modifiedOn: Date;
}

export const EmailCard: React.FC<IEmailCardProps> = (props) => {
    const styles = useStyles();
    const onClick = React.useCallback(() => console.log("Interactive!"), []);

    return (
        <Card
            {...props}
            className={mergeClasses(styles.card)}
            onClick={onClick}
        >
            <CardHeader
                image={
                    <Avatar
                        aria-label="Guest"
                        name={props.from}
                        size={48}
                        image={{
                            src: "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg",
                        }}
                    />
                }
                header={
                    <Body1>
                        <Text>From: {props.from}</Text>
                        <Text>To: {props.to}</Text>
                    </Body1>
                }
                description={
                    <Caption1>
                        <Text>Sent: {props.sent}</Text>
                        <Text>Subject: {props.subject}</Text>
                    </Caption1>
                }
                action={
                    <Button
                        appearance="transparent"
                        icon={<MoreHorizontal20Regular />}
                        aria-label="More options"
                    />
                }
            />


            <Text>Content:</Text>
            <div dangerouslySetInnerHTML={{ __html: props.content }} />

            <CardFooter>
                <Caption1 className={styles.footerContent}>
                    <Subtitle1>Created On: {props.createdOn.toLocaleString()}</Subtitle1>
                    <Subtitle1>Modified On: {props.modifiedOn.toLocaleString()}</Subtitle1>
                </Caption1>
            </CardFooter>
        </Card>
    );
};
