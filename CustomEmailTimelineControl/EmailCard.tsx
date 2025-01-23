import {
    Avatar,
    Body1,
    Caption1,
    Card,
    CardFooter,
    CardHeader,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Text,
    ToggleButton,
    Tooltip
} from "@fluentui/react-components";
import * as React from "react";

import DOMPurify from 'dompurify';


import { MoreHorizontal20Regular } from "@fluentui/react-icons";

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
    content: {
        maxHeight: "100px",
        overflowY: "hidden",
        textOverflow: "ellipsis",
        marginBottom: "8px",
        wordWrap: "break-word",
    },
    expandedContent: {
        maxHeight: "none",
        marginBottom: "8px",
        overflow: "auto",
        wordWrap: "break-word",
    },
});

export const EmailCard: React.FC<IEmailCardProps> = (props) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
        }
    }, [props.content]);

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
                <Caption1>Content: </Caption1>
                <div
                    ref={contentRef}
                    className={isExpanded ? styles.expandedContent : styles.content}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }} />
                {isOverflowing && (
                    <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Show Less" : "Show More"}
                    </ToggleButton>
                )}
            </div>

            <CardFooter className={styles.footer} >
                {/* <Text>Created On: {props.createdOn.toLocaleString()}</Text> */}
                <Text>Modified On: {props.modifiedOn.toLocaleString()}</Text>
            </CardFooter>
        </Card>
    );
};
