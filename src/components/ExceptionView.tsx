import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles<string, { active: boolean }>({
  container: {
  },
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  body: {
    margin: '10px auto',
  }
})


interface Props {
  title?: string;
  children?: React.ReactNode;
} 

const ExceptionView = (props: Props) => {
  const classes = useStyles();
  return (
    <div>
      {props.title && <p className={classes.title}>{props.title}</p>}
      <div className={classes.body}>{props.children}</div>
    </div>
  )
};

export default ExceptionView;