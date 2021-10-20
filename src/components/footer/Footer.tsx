import { createStyles, makeStyles } from '@material-ui/styles';
import { VFC } from 'react';

const useStyles = makeStyles(
  createStyles({
    root: {
      color: '#fff',
      textAlign: 'center',
      backgroundColor: '#444',
      padding: '24px',
    },
    corporate: {},
  })
);

const Footer: VFC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <p>
        <small>&copy;TAKU</small>
      </p>
    </footer>
  );
};

export default Footer;
