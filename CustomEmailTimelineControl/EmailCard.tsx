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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Tooltip,
} from "@fluentui/react-components";

import { CalendarMonthRegular, MoreHorizontal20Regular } from "@fluentui/react-icons";

export interface IEmailCardProps {
    emailId: string;
    from: string;
    sent: string;
    to: string;
    subject: string;
    content: string;
    createdOn: Date;
    modifiedOn: Date;
    isVisualized: boolean;
    style?: React.CSSProperties; // Add style prop
}

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        alignItems: "flex-end",
        gap: "4px",
    },
    card: {
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "fit-content"
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
            style={{
                ...props.style, // Apply custom styles
                // borderLeftColor: !props.isVisualized ? tokens.colorBrandBackground : tokens.colorNeutralBackground1,
                // borderLeftWidth: '4px',
                // borderLeftStyle: 'solid'
            }}
        >
            <CardHeader
                image={
                    <Avatar
                        aria-label="avatar"
                        name={props.from.toUpperCase()}
                        size={48}
                        shape="circular"
                        color="brand"
                        initials={props.from.split('@')[0].split('.').map(name => name[0].toUpperCase()).join('')}
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
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <Tooltip content="More Options" relationship="label">
                                <MenuButton icon={<MoreHorizontal20Regular />} size="large" />
                            </Tooltip>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList>
                                <MenuItem onClick={() => {
                                    const urlParams = new URLSearchParams(window.location.search);
                                    const environmentUrl = window.location.href.split('/main.aspx?')[0];
                                    const appId = urlParams.get('appid');
                                    window.open(`${environmentUrl}/main.aspx?appid=${appId}&pagetype=entityrecord&etn=email&id=${props.emailId}`, '_blank');
                                }}>Open Record {`>`} </MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                }
            />

            <div style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                <div>
                    <Caption1>Subject: </Caption1>
                    <Text>{props.subject}</Text>
                </div>

                <div>
                    <Caption1>Content: </Caption1>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                </div>
            </div>

            <CardFooter className={styles.footer} >
                {/* <Text>Created On: {props.createdOn.toLocaleString()}</Text> */}
                <Text>Modified On: {props.modifiedOn.toLocaleString()}</Text>
            </CardFooter>
        </Card>
    );
};
