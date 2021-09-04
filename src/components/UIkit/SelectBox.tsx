import { ChangeEvent, memo, VFC } from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    minWidth: 128,
    width: '100%',
  },
});

type Category = {
  id: string;
  name: string;
};

type Props = {
  label: string;
  required: boolean;
  value: string;
  options: Category[];
  select: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
};

const SelectBox: VFC<Props> = memo((props: Props) => {
  const { label, required, value, options, select } = props;
  const classes = useStyles();

  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select required={required} value={value} onChange={select}>
          {options.map((option: Category) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

export default SelectBox;
