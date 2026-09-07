import React, { useState } from 'react';
import CartContent from '../../components/cart/CartContent';
import CheckoutModal from '../../components/cart/CheckoutModal';

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <CartContent onCheckout={() => setShowCheckout(true)} />
      <CheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
}