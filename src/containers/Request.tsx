import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    border: '1px solid #f0f0f0'
  },
  pageTitle: {}
})

const Reqeust = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.pageTitle}>Multi step form</h2>
    </div>
  );
}

export default Reqeust;