import { TextField } from '@material-ui/core';
import { memo } from 'react';
import { ChangeEvent, VFC } from 'react';

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  minRows: number | string;
  required: boolean;
  value: string | number;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: VFC<Props> = memo((props: Props) => {
  const {
    fullWidth,
    label,
    multiline,
    minRows,
    required,
    value,
    type,
    onChange,
  } = props;

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      minRows={minRows}
      required={required}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
});

export default TextInput;
