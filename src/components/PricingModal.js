// src/components/PricingModal.js
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';

const PricingModal = ({ isOpen, onClose, userEmail = "customer@ghanaads.store" }) => {
  if (!isOpen) return null;

  const publicKey = 'pk_test_7f55c7f5217c01e854a87f5b4f4f30f1b5889b5e';

  const onSuccess = (ref) => {
    confetti({ particleCount: 400, spread: 100, colors: ['#CE1126', '#FCD116', '#006B3F'] });
    alert('Payment Successful! You are now PRO!');
    localStorage.setItem('isProUser', 'true');
    onClose();
    window.location.reload();
  };

  const PaystackButton = ({ amount, plan }) => {
    const config = {
      reference: Date.now().toString() + Math.random().toString(36),
      email: userEmail,
      amount: amount * 100,
      publicKey,
      metadata: { plan }
    };
    const initializePayment = usePaystackPayment(config);

    return (
      <button
        onClick={() => initializePayment(onSuccess)}
        className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-black font-black text-2xl py-6 rounded-2xl hover:scale-105 transition shadow-xl"
      >
        Pay ₵{amount}/mo → {plan}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="glass-card rounded-3xl p-10 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="float-right"><X size={40} /></button>
        <h2 className="text-5xl font-black text-center text-yellow-400 mb-10">Upgrade Now</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold">Starter</h3>
            <p className="text-6xl font-black my-4">₵199</p>
            <PaystackButton amount={199} plan="Starter" />
          </div>
          <div className="glass-card p-10 text-center ring-8 ring-yellow-400 scale-110 shadow-2xl">
            <div className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full mb-4">POPULAR</div>
            <h3 className="text-4xl font-black">Pro</h3>
            <p className="text-7xl font-black my-4">₵399</p>
            <PaystackButton amount={399} plan="Pro" />
          </div>
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold">Enterprise</h3>
            <p className="text-6xl font-black my-4">₵999</p>
            <PaystackButton amount={999} plan="Enterprise" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;