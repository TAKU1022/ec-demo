import { memo, VFC } from 'react';
import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { FavoriteBorder, ShoppingCart } from '@material-ui/icons';

const useStyles = makeStyles({
  iconCell: {
    width: 48,
    height: 48,
    padding: 0,
  },
});

type Props = {
  sizes: Array<{ size: string; quantity: number }>;
};

const SizeTable: VFC<Props> = memo((props: Props) => {
  const classes = useStyles();

  const { sizes } = props;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton>
                      <ShoppingCart />
                    </IconButton>
                  ) : (
                    <p>売切</p>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default SizeTable;
