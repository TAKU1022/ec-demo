import { memo, MouseEvent, VFC } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FavoriteBorder, Menu, ShoppingCart } from '@material-ui/icons';

type Props = {
  handleDrawerToggle: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
};

const HeaderMenus: VFC<Props> = memo((props: Props) => {
  const { handleDrawerToggle } = props;

  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={handleDrawerToggle}>
        <Menu />
      </IconButton>
    </>
  );
});

export default HeaderMenus;
