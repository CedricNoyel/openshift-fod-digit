import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@horizon/components-react";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  }
}));

export default function ContainerBox(props) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {props.children}
    </Container>
  );
  
}