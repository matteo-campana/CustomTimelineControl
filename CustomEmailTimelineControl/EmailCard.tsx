import * as React from 'react';
import { makeStyles, tokens, Button, Text, Caption1, mergeClasses } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardProps } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    gap: '36px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  title: { margin: '0 0 12px' },

  description: { margin: '0 0 12px' },

  card: {
    width: '480px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  logo: {
    borderRadius: '4px',
    width: '48px',
    height: '48px',
  },

  text: { margin: '0' },
});


export const EmailCard = ({ className, ...props }: CardProps) => {
  const styles = useStyles();

  const onClick = React.useCallback(() => console.log('Interactive!'), []);

  return (
    <Card
      {...props}
      className={mergeClasses(className, styles.card)}
      onClick={onClick}
    >
      <CardHeader
        image={
          <img
            className={styles.logo}
            src={resolveAsset('app_logo.svg')}
            alt="App name logo"
          />
        }
        header={<Text weight="semibold">App Name</Text>}
        description={<Caption1 className={styles.caption}>Developer</Caption1>}
        action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Regular />}
            aria-label="More options"
          />
        }
      />

      <p className={styles.text}>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw.
        Marshmallow pastry jujubes toffee sugar plum.
      </p>
    </Card>
  );
};
