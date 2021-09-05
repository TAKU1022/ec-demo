import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CheckCircle, Delete, Edit } from '@material-ui/icons';
import { TextInput } from '../UIkit';

const useStyles = makeStyles({
  iconCell: {
    width: 48,
    height: 48,
  },
  checkIcon: {
    float: 'right',
  },
});

type Props = {
  sizes: Array<{ size: string; quantity: number }>;
  setSizes: Dispatch<SetStateAction<Array<{ size: string; quantity: number }>>>;
};

const SetSizeArea: VFC<Props> = memo((props: Props) => {
  const classes = useStyles();
  const { sizes, setSizes } = props;

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSize(event.target.value),
    [setSize]
  );

  const inputQuantity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setQuantity(parseInt(event.target.value, 10)),
    [setQuantity]
  );

  const addSize = (index: number, size: string, quantity: number) => {
    if (size === '' || quantity === null) {
      return;
    } else {
      if (index === sizes.length) {
        setSizes((prevState) => [...prevState, { size, quantity }]);
        setIndex(index + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = sizes;
        newSizes[index] = { size, quantity };
        setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (editIndex: number, size: string, quantity: number) => {
    setIndex(editIndex);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex: number) => {
    const newSizes = sizes.filter((_, i) => i !== deleteIndex);
    setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(sizes.length);
  }, [sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map(
                (item: { size: string; quantity: number }, i: number) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => editSize(i, item.size, item.quantity)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => deleteSize(i)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            minRows={1}
            required={true}
            value={size}
            type={'text'}
            onChange={inputSize}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            minRows={1}
            required={true}
            value={quantity}
            type={'number'}
            onChange={inputQuantity}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircle />
        </IconButton>
      </TableContainer>
    </div>
  );
});

export default SetSizeArea;
