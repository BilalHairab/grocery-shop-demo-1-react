import {
    BillingDetails,
    confirmPaymentSheetPayment,
    confirmSetupIntent,
    initPaymentSheet,
    presentPaymentSheet,
    useConfirmPayment,
  } from '@stripe/stripe-react-native';
  import { useEffect, useState } from 'react';
  const API_URL = 'https://groceryapp-xhq6gt7tia-uc.a.run.app'
  
  const usePaymentHook = () => {
    const { loading, confirmPayment } = useConfirmPayment();
    // const { isApplePaySupported, presentApplePay } = useApplePay();
    // const { isGooglePaySupported, initGooglePay } = useGooglePay();
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [isSupported, setIsSupported] = useState<boolean>(true);
  
    useEffect(() => {
      setPaymentLoading(loading);
    }, [loading]);
  
    const onSuccess = (message: string, onSuccessToScreen?: (string: string) => void) => {
        setPaymentLoading(false);
        alert(message)
        onSuccessToScreen?.(message);
    };
  
    const onError = (message: string, onErrorScreen?: (string: string) => void) => {
      setPaymentLoading(false);
      onErrorScreen?.(message);
    };
  
    const fetchPaymentIntentClientSecret = async ({ amount, gateway }: {amount: number, gateway: string}) => {
      const res =  await fetch(`${API_URL}/getPaymentIntent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount,
          currency: 'AED',
          gateway: gateway,
        }),
      }).then((response) => {
        console.log(`response ${JSON.stringify(response)}`)
        return response.json()
      })
      .then((data) => data)
      .catch((error) => {
       console.error(error)
      });
      console.log(`fetchPaymentIntentClientSecret ${JSON.stringify(res)}`)
      return res.paymentIntent.client_secret;
    };
  
    // const googlePay = async ({ amount }: {amount: number}) => {
    //   if (paymentLoading) return;
    //   setPaymentLoading(true);
    //   const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: Strings.googlePay });
    //   const { error } = await presentGooglePay({
    //     clientSecret,
    //     forSetupIntent: false
    //   });
    //   if (error) {
    //     alert(error?.localizedMessage || '', amount);
    //     return;
    //   } else {
    //     onSuccess(`Payment of AED ${amount} is successful! `)
    //   }
    // };
  
    // const applePay = async ({ amount }) => {
    //   if (!isApplePaySupported || paymentLoading) return;
    //   setPaymentLoading(true);
    //   const { error } = await presentApplePay({
    //     cartItems: [{ label: 'topup', amount: amount.toString() }],
    //     country: 'DE',
    //     currency: 'EUR'
    //   });
    //   if (error) {
    //     showErrorMessage(error?.message || '', amount);
    //   } else {
    //     const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'applepay' });
    //     if (clientSecret) {
    //       const { error: confirmError } = await confirmApplePayPayment(
    //         clientSecret
    //       );
    //       if (confirmError) {
    //         showErrorMessage(confirmError?.localizedMessage || '', amount);
    //       } else {
    //         onSuccess(`Payment of AED ${amount} is successful! `)
    //       }
    //     }
    //   }
    // };
  
    // const initializeGooglePay = async () => {
    //   // TODO: Test env false
    //   if (!(await isGooglePaySupported({ testEnv: true }))) {
    //     alert('Google Pay not supported');
    //     setIsSupported(false);
    //     return;
    //   }
    //   const { error } = await initGooglePay({
    //     testEnv: true,
    //     merchantName: 'GAVEL',
    //     countryCode: 'DE'
    //   });
    //   if (error) {
    //     alert(error.message);
    //     return;
    //   } else {
    //     setIsSupported(true);
    //   }
    // };
  
    const giroPay = async ({ amount }: {amount: number}) => {
      if (paymentLoading) return;
      setPaymentLoading(true);
      const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'giropay' });
      console.log('inside giropay',clientSecret)
      if (clientSecret) {
        const billingDetails: BillingDetails = {
          name: 'Test User'
        };
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Giropay',
          paymentMethodData: { billingDetails: billingDetails }
        });
        if (error) {
          console.log('error', error)
          alert(error?.localizedMessage || '' + amount);
        } else if (paymentIntent) {
          onSuccess(`Payment of AED ${amount} is successful! `)
        }
      }
    };
  
    const epsPay = async ({ amount }: {amount: number}) => {
      if (paymentLoading) return;
      setPaymentLoading(true);
      const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'eps' });
      if (clientSecret) {
        console.log(`clientSecret ${clientSecret}`)
        const billingDetails: BillingDetails = {
          name: 'Test User'
        };
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Eps',
          paymentMethodData: { billingDetails: billingDetails }
        });
        if (error) {
            console.warn(`error ${JSON.stringify(error)}`)
          alert(error?.localizedMessage || '' + amount);
        } else if (paymentIntent) {
          onSuccess(`Payment of AED ${amount} is successful! `)
        }
      }
    };
  
    const cardPay = async ( amount: number, suc: (message: string) => void, err: (message: string) => void) => {
      if (paymentLoading) return;
      setPaymentLoading(true);
      const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'pm_card_visa' });
      if (clientSecret) {
        console.log(`clientSecret ${clientSecret}`)
        await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          customFlow: true,
          merchantDisplayName: 'TEST NAME',
        });
        const result = await presentPaymentSheet();
        console.log(`paymentOption ${JSON.stringify(result)}`)
  
        const { error } = await confirmPaymentSheetPayment();
        if (error) {
            console.warn(`error ${JSON.stringify(error)}`)
            onError(error?.localizedMessage || '' + amount, err)
          alert(error?.localizedMessage || '' + amount);
        } else {
          onSuccess(`Payment of AED ${amount} is successful! `, suc)
        }
      }
    };
  
    const klarnaPay = async ({ amount }: {amount: number}) => {
      if (paymentLoading) return;
      setPaymentLoading(true);
      const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'klarna' });
      if (clientSecret) {
        const billingDetails: BillingDetails = {
          name: 'Test User',
          email: 'test@gmail.com',
          address: { country: 'AE' }
        };
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Klarna',
          paymentMethodData: { billingDetails: billingDetails }
        });
        if (error) {
          alert(error?.localizedMessage || '' + amount);
        } else if (paymentIntent) {
          onSuccess(`Payment of AED ${amount} is successful! `)
        }
      }
    };
  
    const fetchSetUpIntentClientSecret = async() => {
    //   const res =  await fetch(`${API_URL}/create-setup-intent`, {
    //     method: 'POST'
    //   }).then((response) => response.json())
    //   .then((data) => data)
    //   .catch((error) => {
    //    console.log(error)
    //   });
      return "sk_test_51PyxnrRo9BR98qGjsLjeareIeGweppKDEjs6YyUKMuX3sDnSuU0Kvh4IycOt6f0yShpIdgTQMdKD7t06ra8hYUse00uPdABQvX";
    }
  
    const addCardToWallet = async () => {
      if (paymentLoading) return;
      setPaymentLoading(true);
      const clientSecret = await fetchSetUpIntentClientSecret();
      console.log('clientsecret',clientSecret)
      if (clientSecret) {
        const billingDetails: BillingDetails = {
          email: 'test@gmail.com',
          name: 'Test'
        };
        const { setupIntent, error } = await confirmSetupIntent(
          clientSecret,
          {
            paymentMethodType: 'Card',
            paymentMethodData: { billingDetails: billingDetails }
          },
          { setupFutureUsage: 'OnSession' }
        );
        if (setupIntent) {
          alert('Card added succesfull!')
        }
        if (error){
          alert('Error adding card. Please try again later.')
        }
        setPaymentLoading(false);
      }
    };
  
    return {
      paymentLoading,
    //   applePay,
    //   googlePay,
    //   initializeGooglePay,
      isSupported,
      giroPay,
      epsPay,
      cardPay,
      klarnaPay,
      addCardToWallet
    };
  };
  
  export default usePaymentHook;