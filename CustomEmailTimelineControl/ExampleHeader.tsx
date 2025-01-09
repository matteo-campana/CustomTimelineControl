import * as React from 'react';
import { makeStyles, Subtitle1, Body1 } from '@fluentui/react-components';

const useStyles = makeStyles({
  title: { margin: '0 0 12px' },
  description: { margin: '0 0 12px' },
});

export const ExampleHeader = ({ title, description }: Record<string, string>) => {
  const styles = useStyles();

  return (
    <header>
      {title ? (
        <Subtitle1 as="h4" block className={styles.title}>
          {title}
        </Subtitle1>
      ) : null}

      {description ? (
        <Body1 as="p" block className={styles.description}>
          {description}
        </Body1>
      ) : null}
    </header>
  );
};
