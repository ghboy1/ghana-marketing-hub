// src/components/PricingModal.js
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';   // ← THIS WAS MISSING BEFORE

const PricingModal = ({ isOpen, onClose, userEmail = "customer@ghanaads.store" }) => {
  if (!isOpen) return null;

  // YOUR REAL TEST PUBLIC KEY
  const publicKey = 'pk_test_7f55c7f5217c01e854a87f5b4f4f30f1b5889b5e';

  const onSuccess = (reference) => {
    confetti({ particleCount: 300, spread: 120, colors: ['#CE1126', '#FCD116', '#006B3F'] });
    alert(`Payment Successful! Ref: ${reference.reference}`);
    localStorage.setItem('isProUser', 'true');
    localStorage.setItem('userPlan', reference.metadata.plan);
    onClose();
    window.location.reload();
  };

  const PaystackButton = ({ amount, plan }) => {
    const config = {
      reference: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
      email: userEmail,
      amount: amount * 100,
      publicKey,
      metadata: { plan }
    };
    const initializePayment = usePaystackPayment(config);

    return (
      <button
        onClick={() => initializePayment(onSuccess)}
        className="w-full btn-ghana text-2xl py-6 font-black hover:scale-105 transition shadow-2xl"
      >
        Pay ¢{amount}/mo → {plan}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="glass-card rounded-3xl p-10 max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-white/80 hover:text-white">
          <X size={36} />
        </button>

        <h2 className="text-5xl font-black text-center mb-10 text-yellow-400 clear-both">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Starter</h3>
            <p className="text-6xl font-black mb-2">¢199<span className="text-2xl">/mo</span></p>
            <PaystackButton amount={199} plan="Starter" />
          </div>

          <div className="glass-card p-10 text-center ring-8 ring-yellow-400 scale-110 shadow-2xl">
            <div className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full inline-block mb-6">MOST POPULAR</div>
            <h3 className="text-4xl font-black mb-4">Pro (Ghana)</h3>
            <p className="text-7xl font-black mb-2">¢399<span className="text-3xl">/mo</span></p>
            <PaystackButton amount={399} plan="Pro" />
          </div>

          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Enterprise</h3>
            <p className="text-6xl font-black mb-2">¢999<span className="text-2xl">/mo</span></p>
            <PaystackButton amount={999} plan="Enterprise" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;