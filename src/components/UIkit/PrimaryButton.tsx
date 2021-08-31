import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { VFC } from 'react';

const useStyles = makeStyles({
  'button': {
    backgroundColor: '#4dd0e1',
    color: '#000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

type Props = {
  label: string;
  onClick: () => void;
};

const PrimaryButton: VFC<Props> = (props: Props) => {
  const { label, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};

export default PrimaryButton;
