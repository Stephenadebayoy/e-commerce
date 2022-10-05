import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        //console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        //is their is error go back to the home page
        // history.pushState('/');
      }
    };
    generateToken();
  }, []);

  //funtion for the form
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  //function for the form then pass it as props in addressform
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  //
  //
  // if the time runs out for payment
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 2000);
  };
  //
  //
  let Confirmation = () =>
    order.customer ? (
      <React.Fragment>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer.customer_reference}
          </Typography>
        </div>
        <br />
        <Button variant='outlined' type='button' component={Link} to='/'>
          Back to Home
        </Button>
      </React.Fragment>
    ) : isFinished ? (
      <React.Fragment>
        <div>
          <Typography variant='h5'>Thank you for your purchase</Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button variant='outlined' type='button' component={Link} to='/'>
          Back to Home
        </Button>
      </React.Fragment>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  //
  //
  if (error) {
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <Button variant='outlined' type='button' component={Link} to='/'>
        Back to Home
      </Button>
      <br />
    </>;
  }
  //
  //

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        timeout={timeout}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toobar} />
      <main className={classes.toobar}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
