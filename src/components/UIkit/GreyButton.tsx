import { Button, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { memo, VFC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.grey['300'],
      fontSize: 16,
      height: 48,
      width: 256,
    },
  })
);

type Props = {
  label: string;
  onClick: () => void;
};

const GreyButton: VFC<Props> = memo((props: Props) => {
  const { label, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
});

export default GreyButton;
