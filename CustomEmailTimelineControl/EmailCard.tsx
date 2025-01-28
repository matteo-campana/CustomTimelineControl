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
    Tooltip,
    Overflow,
    OverflowItem,
    useIsOverflowItemVisible,
    useOverflowMenu,
    OverflowItemProps,
    Button,
} from "@fluentui/react-components";
import * as React from "react";

import DOMPurify from 'dompurify';
import { AttachText20Regular, MoreHorizontal20Regular } from "@fluentui/react-icons";
import { IInputs } from "./generated/ManifestTypes";


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
    context: ComponentFramework.Context<IInputs>;
    attachments: { attachmentid: string, filename: string, filesize: number, mimetype: string }[]; // Update attachments prop
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
        overflowY: "auto",
        wordWrap: "break-word",
    },
    label: {
        marginTop: "4px", // Add vertical margin to the label
    },
    container: {
        display: "flex",
        gap: "4px",
        flexWrap: "wrap",
    },
});

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, "id">> = (props) => {
    const { id } = props;
    const isVisible = useIsOverflowItemVisible(id);

    if (isVisible) {
        return null;
    }

    return <MenuItem>{id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
    const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

    if (!isOverflowing) {
        return null;
    }

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    {itemIds.map((i) => {
                        return <OverflowMenuItem key={i} id={i} />;
                    })}
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};

export const EmailCard: React.FC<IEmailCardProps> = (props) => {
    const t = (key: string) => props.context.resources.getString(key);
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
                        <Text>{t('EmailFrom')}: {props.from}</Text>
                        <Text>{t('EmailTo')}: {props.to}</Text>
                        <Text>{t('EmailSent')}: {props.sent}</Text>
                    </Body1>
                }
                action={
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <Tooltip content={t('EmailMoreOptions')} relationship="label">
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
                                }}>{t('EmailOpenRecord')} {`>`} </MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                }
            />

            <div style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                <div>
                    <Caption1 className={styles.label}>{t('EmailSubject')}: </Caption1>
                    <Text>{props.subject}</Text>
                </div><br />
                <div>
                    <Caption1 className={styles.label}>{t('EmailContent')}: </Caption1>
                    <div
                        ref={contentRef}
                        className={isExpanded ? styles.expandedContent : styles.content}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }} />
                </div>

                {props.attachments.length > 0 ? <div>
                    <Caption1 className={styles.label}>{t('EmailAttachments')}: </Caption1>
                    <Overflow padding={4}>
                        <div className={styles.container}>
                            {props.attachments.slice(0, 3).map((attachment, index) => (
                                <OverflowItem key={index} id={attachment.attachmentid}>
                                    <Button><AttachText20Regular /> {attachment.filename}</Button>
                                </OverflowItem>
                            ))}
                            <OverflowMenu 
                            itemIds={props.attachments.slice(3).map(att => att.attachmentid)} 
                            key={props.attachments.slice(3).map(att => att.attachmentid).join('')} />
                        </div>
                    </Overflow>
                </div> : <></>}


                {isOverflowing && (
                    <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? t('EmailShowLess') : t('EmailShowMore')}
                    </ToggleButton>
                )}

            </div>

            <CardFooter className={styles.footer} >
                <Text>{t('EmailModifiedOn')}: {props.modifiedOn.toLocaleString()}</Text>
            </CardFooter>
        </Card>
    );
};

