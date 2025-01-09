import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { EmailCard } from './EmailCard';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '500px',
  },
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
