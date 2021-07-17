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
      <h2 className={classes.pageTitle}>전문가에게 의뢰하기</h2>
      <form action="/" method="post">
        <fieldset>
          <legend>item.title</legend>
          inputs
        </fieldset>
        <fieldset>
          <legend>item.title</legend>
          inputs
        </fieldset>
      </form>
    </div>
  );
}

export default Reqeust;