import * as React from "react";
import {
  Text,
} from "@fluentui/react-components";

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/";

  return `${ASSET_URL}${asset}`;
};

export interface IEmailCardProps {
  from: string;
  sent: string;
  to: string;
  subject: string;
  content: string;
  createdOn: Date;
  modifiedOn: Date;
}

export class EmailCard extends React.Component<IEmailCardProps> {
  public render(): React.ReactNode {
    return (
      <div>
        <div>
          <Text>From: {this.props.from}</Text>
          <Text>Sent: {this.props.sent}</Text>
          <Text>To: {this.props.to}</Text>
          <Text>Subject: {this.props.subject}</Text>
          <Text>Created On: {this.props.createdOn.toLocaleString()}</Text>
          <Text>Modified On: {this.props.modifiedOn.toLocaleString()}</Text>
          <Text>Content:</Text>
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>
      </div>
    )
  }
}