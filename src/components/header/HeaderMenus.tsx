import { VFC } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FavoriteBorder, Menu, ShoppingCart } from '@material-ui/icons';

const HeaderMenus: VFC = () => {
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
      <IconButton>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
