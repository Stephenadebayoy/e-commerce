import React from 'react';
import { commerce } from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { Products, Navbar } from './components/Products';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const fetchData = await commerce.cart.retrieve();
    setCart(fetchData);
    //   const cart= await commerce.cart.retrieve();

    //   setCart(cart)
    // };
    // or
    // console.log(fetchData, 'fetchData');
  };

  const handleAddCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    console.log(item, 'item');
    setCart(item);
  };

  // const cartObject = useMemo(() => {
  //   return { id: cart.total_items };
  // }, [cart.total_items]);

  const addCart = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });
    setCart(item);
  };

  const removeCart = async (productId, quantity) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  };

  const emptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item);
  };
  // for the stripe function payment
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      //console.log(newOrder);

      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();

      //console.log(incomingOrder);
    } catch (error) {
      setErrorMessage(error.data.error.message);

      //refreshCart();
    }
  };
  ///
  ///

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(cart);

  // return (
  //   <div>
  //     {/* another props for adding to cart */}
  //     <Navbar totalItems={cart?.total_items} />
  //     {/* destructure props in products map */}
  //     {/* <Products products={products} onAddToCart={handleAddCart} /> */}

  //     <Cart cart={cart} />
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Navbar totalItems={cart?.total_items} />
      <Routes>
        <Route
          exact
          path='/'
          element={<Products products={products} onAddToCart={handleAddCart} />}
        />

        <Route
          exact
          path='/cart'
          element={
            <Cart
              cart={cart}
              addCart={addCart}
              removeCart={removeCart}
              emptyCart={emptyCart}
            />
          }
        />
        <Route
          exact
          path='/checkout'
          element={<Checkout cart={cart} />}
          cart={cart}
          // to check functions props
          order={order}
          handleCaptureCheckout={handleCaptureCheckout}
          error={errorMessage}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
