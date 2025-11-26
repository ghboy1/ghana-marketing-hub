// src/components/PricingModal.js
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import confetti from 'canvas-confetti';

const PricingModal = ({ isOpen, onClose, userEmail = "customer@ghanaads.store" }) => {
  if (!isOpen) return null;

  // REPLACE THIS WITH YOUR REAL PAYSTACK TEST KEY FIRST
  const publicKey = 'pk_test_YOUR_TEST_KEY_HERE'; // ← Put your real key here

  const onSuccess = (reference) => {
    confetti({
      particleCount: 300,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#CE1126', '#FCD116', '#006B3F', '#000000']
    });
    alert(`Payment Successful! You're now on PRO plan! Ref: ${reference.reference}`);
    localStorage.setItem('isProUser', 'true');
    localStorage.setItem('userPlan', reference.metadata.plan);
    onClose();
    window.location.reload();
  };

  const onClosePaystack = () => {
    console.log('Payment closed');
  };

  const PaystackButton = ({ amount, plan }) => {
    const config = {
      reference: new Date().getTime().toString() + Math.floor(Math.random() * 10000),
      email: userEmail,
      amount: amount * 100, // amount in kobo
      publicKey,
      metadata: {
        plan,
        domain: 'ghanaads.store'
      }
    };

    const initializePayment = usePaystackPayment(config);

    return (
      <button
        onClick={() => initializePayment(onSuccess, onClosePaystack)}
        className="w-full btn-ghana text-2xl py-6 font-black hover:scale-105 transition shadow-2xl"
      >
        Pay ¢{amount}/mo → {plan}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="glass-card rounded-3xl p-10 max-w-5xl w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-white/60 hover:text-white">
          <x size={32} />
        </button>

        <h2 className="text-5xl font-black text-center mb-10 text-yellow-400">
          Upgrade to PRO – Grow Faster
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="glass-card p-8 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold mb-4">Starter</h3>
            <p className="text-6xl font-black mb-2">¢199<span className="text-2xl">/mo</span></p>
            <ul className="text-left space-y-3 mb-8 text-white/90">
              <li>50 AI Posts/month</li>
              <li>Best time to post</li>
              <li>Ghana holidays calendar</li>
              <li>Email support</li>
            </ul>
            <PaystackButton amount={199} plan="Starter" />
          </div>

          {/* PRO – Most Popular */}
          <div className="glass-card p-10 text-center ring-4 ring-yellow-400 ring-offset-4 ring-offset-black scale-110 shadow-2xl">
            <div className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full inline-block mb-6 text-lg">
              MOST POPULAR
            </div>
            <h3 className="text-4xl font-black mb-4">Pro (Ghana)</h3>
            <p className="text-7xl font-black mb-2">¢399<span className="text-3xl">/mo</span></p>
            <ul className="text-left space-y-4 mb-10 text-white/95 text-lg">
              <li><strong>Unlimited AI Posts</strong></li>
              <li>Auto-post to Instagram & Facebook</li>
              <li>Competitor spy tool</li>
              <li>Advanced analytics</li>
              <li>Priority WhatsApp support</li>
            </ul>
            <PaystackButton amount={399} plan="Pro" />
          </div>

          {/* Enterprise */}
          <div className="glass-card p-8 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold mb-4">Enterprise</h3>
            <p className="text-6xl font-black mb-2">¢999<span className="text-2xl">/mo</span></p>
            <ul className="text-left space-y-3 mb-8 text-white/90">
              <li>Everything in Pro</li>
              <li>White-label (your branding)</li>
              <li>Dedicated account manager</li>
              <li>Custom features</li>
            </ul>
            <PaystackButton amount={999} plan="Enterprise" />
          </div>
        </div>

        <div className="text-center mt-10">
          <button onClick={onClose} className="text-white/60 hover:text-white text-lg">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;