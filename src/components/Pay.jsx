import React, { useState } from 'react';
import Paypal from './Paypal';

function App() {
  const [amount, setAmount] = useState(10.00); 
  return (
    <div>
      <h1>Checkout</h1>
      <Paypal amount={amount} />
    </div>
  );
}

export default App;
