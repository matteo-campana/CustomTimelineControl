import {
    makeStyles,
    tokens,
} from "@fluentui/react-components";
import * as React from 'react';
import { EmailCard } from './EmailCard';

const useStyles = makeStyles({
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "300px",
    },
    listItem: {
        display: "grid",
        padding: "8px",
    },
    caption: {
        color: tokens.colorNeutralForeground3,
    },
    image: {
        height: "160px",
        maxWidth: "100%",
        borderRadius: "5px",
    },
    title: {
        color: tokens.colorNeutralForeground1,
        fontWeight: 600,
        display: "block",
    },
    preview: { gridArea: "preview", overflow: "hidden" },
    header: { gridArea: "header" },
    action: { gridArea: "action" },
    secondaryAction: { gridArea: "secondary_action" },
});

export const EmailCardList = () => {
    const styles = useStyles();

    return (
        <div className={styles.list}>
            <EmailCard />
            <EmailCard />
            <EmailCard />
            <EmailCard />
            <EmailCard />
        </div>
    );
};
