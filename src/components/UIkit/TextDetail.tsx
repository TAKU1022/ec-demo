import { createStyles, makeStyles } from '@material-ui/styles';
import { VFC } from 'react';

const useStyles = makeStyles(
  createStyles({
    row: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: 16,
    },
    label: {
      marginLeft: 0,
      marginRight: 'auto',
    },
    value: {
      fontWeight: 600,
      marginLeft: 'auto',
      marginRight: 0,
    },
  })
);

type Props = {
  label: string;
  value: string;
};

const TextDetail: VFC<Props> = (props: Props) => {
  const classes = useStyles();
  const { label, value } = props;

  return (
    <div className={classes.row}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default TextDetail;
