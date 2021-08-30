import { TextField } from '@material-ui/core';
import { VFC } from 'react';

type Props = {
  fullWidth: boolean;
  label: Node;
  multiline: boolean;
  minRows: number | string;
  required: boolean;
  value: string;
  type: string;
  onChange: () => void;
};

const TextInput: VFC<Props> = (props: Props) => {
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
};

export default TextInput;
