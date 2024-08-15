"use client"
import { useState, useEffect } from 'react';

const GooglePayButtonComponent = () => {
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    // Load the Google Pay API script dynamically
    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.onload = () => {
      // Now that the script is loaded, you can use the Google Pay API
      if (window.google) {
        const googlePayClient = new window.google.payments.api.PaymentsClient({
          environment: 'TEST', // Change to 'PRODUCTION' when going live
        });

        const paymentDataRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example', // Replace with your gateway
                  gatewayMerchantId: 'your_gateway_merchant_id',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: 'your_merchant_id',
            merchantName: 'Your Merchant Name',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '10.00',
            currencyCode: 'USD',
          },
        };

        setPaymentRequest(paymentDataRequest);
      }
    };
    script.onerror = () => {
      console.error('Google Pay script could not be loaded.');
    };

    document.head.appendChild(script);

    // Clean up the script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const onLoadPaymentData = async (paymentData) => {
    const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

    try {
      const response = await fetch('/api/gpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentToken,
          amount: '10.00',
          currencyCode: 'USD',
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Payment successful!');
      } else {
        alert('Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div>
      {paymentRequest && (
        <button
          onClick={() => googlePayClient.loadPaymentData(paymentRequest).then(onLoadPaymentData)}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          Pay with Google Pay
        </button>
      )}
    </div>
  );
};

export default GooglePayButtonComponent;
