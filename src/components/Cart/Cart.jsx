import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  CssBaseline,
} from '@material-ui/core';
import useStyles from './styles';
import Cartitem from './Cartitem/Cartitem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, addCart, removeCart, emptyCart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant='subtitle'>
      You have no items in your shopping Cart,
      <Link to='/' className={classes.link}>
        kindly add some
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {/* {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Cartitem item={item} />
          </Grid>
        ))} */}
        {/* props from app js and link to Cartitem */}
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Cartitem item={item} onUpdate={addCart} onRemove={removeCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal:{cart.subtotal.formatted_with_symbol}
        </Typography>

        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to='/checkout'
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );
  if (!cart.line_items) return 'loading...';

  return (
    <Container>
      <CssBaseline />
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h4' gutterBottom>
        Your Shopping Cart
      </Typography>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
