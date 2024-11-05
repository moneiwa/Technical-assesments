import React, { useRef, useEffect, useState } from 'react';

export default function Paypal({ amount }) {
  const paypalRef = useRef();
  const [loading, setLoading] = useState(true);
  const [showPayPal, setShowPayPal] = useState(false);

  useEffect(() => {
    console.log("Amount:", amount);
    console.log("PayPal Component Rendered");

    const loadPaypalScript = () => {
      return new Promise((resolve, reject) => {
        if (window.paypal) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://www.paypal.com/sdk/js?client-id=AbJcrLpUcb4AwBnax1RCqGUx0q_bnUtxm4sqbQ08ObuYLNdAR9Xh7vxg-oaADBYGau0g-ZltaixcA5oM'; // Replace with your client ID
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
          document.body.appendChild(script);
        }
      });
    };

    console.log("paypalRef.current before render:", paypalRef.current);

    if (showPayPal) {
      loadPaypalScript().then(() => {
        if (paypalRef.current) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              if (amount === undefined || isNaN(amount)) {
                console.error("Amount is undefined or not a number");
                return Promise.reject(new Error("Amount is required"));
              }

              const amountValue = Number(amount); 

              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Cool looking item",
                    amount: {
                      currency_code: "USD",
                      value: amountValue.toFixed(2), 
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              try {
                const order = await actions.order.capture();
                console.log('Order confirmed: ', order);
              } catch (error) {
                console.error('Payment error: ', error);
              }
            },
            onError: (err) => {
              console.error('PayPal Checkout onError:', err);
            },
          }).render(paypalRef.current).then(() => setLoading(false));
        }
      }).catch((error) => {
        console.error('Error loading PayPal script:', error);
      });
    }

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = ''; 
      }
    };
  }, [amount, showPayPal]);

  return (
    <div>
      {!showPayPal ? (
        <button onClick={() => { setShowPayPal(true); console.log("PayPal button shown"); }}>
          Show PayPal Button
        </button>
      ) : (
        <div ref={paypalRef} style={{ marginTop: '20px' }}></div>
      )}
    </div>
  );
}
