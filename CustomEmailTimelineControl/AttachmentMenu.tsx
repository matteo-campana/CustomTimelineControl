import {
    Button
} from "@fluentui/react-components";
import { AttachText20Regular } from "@fluentui/react-icons";
import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { getAttachmentBody } from "./services/emailService";

export interface IEmailCardAttachment {
    attachmentid: string;
    filename: string;
    filesize: number;
    mimetype: string;
    context: ComponentFramework.Context<IInputs>;
}



export const AttachmentMenu: React.FC<{ attachments: IEmailCardAttachment[] }> = ({ attachments }) => {

    const handleAttachmentClick = async (attachment: IEmailCardAttachment) => {
        try {
            const attachmentBody = await getAttachmentBody(attachment);
            const blob = new Blob([attachmentBody], { type: attachment.mimetype });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = attachment.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading attachment:", error);
        }
    };

    return (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-start" }}>
            {attachments.map((attachment, index) => (

                <Button key={index} onClick={() => handleAttachmentClick(attachment)}>
                    <AttachText20Regular /> {attachment.filename}
                </Button>

            ))}
        </div>
    );
};
