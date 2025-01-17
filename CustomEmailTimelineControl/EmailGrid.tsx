import * as React from "react";
import { useEffect, useState } from "react";
import { IInputs } from "./generated/ManifestTypes";

interface Email {
    subject: string;
    description: string;
    from: string;
    createdon: string;
}

interface EmailGridProps {
    context: ComponentFramework.Context<IInputs>;
}

const EmailGrid: React.FC<EmailGridProps> = ({ context }) => {
    const [emails, setEmails] = useState<Email[]>([]);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const result = await context.webAPI.retrieveMultipleRecords("email", "?$select=subject,description,from,createdon&$orderby=createdon desc");
                setEmails(result.entities as Email[]);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching emails: ", error.message);
                } else {
                    console.error("Error fetching emails: ", error);
                }
            }
        };

        fetchEmails();
    }, [context]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>From</th>
                    <th>Created On</th>
                </tr>
            </thead>
            <tbody>
                {emails.map((email, index) => (
                    <tr key={index}>
                        <td>{email.subject}</td>
                        <td>{email.description}</td>
                        <td>{email.from}</td>
                        <td>{new Date(email.createdon).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmailGrid;
