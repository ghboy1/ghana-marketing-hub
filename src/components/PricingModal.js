// src/components/PricingModal.js
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';

const PricingModal = ({ isOpen, onClose, userEmail = "huseinrauf0@gmail.com" }) => {
  // HOOK MUST BE AT THE VERY TOP — NO CONDITIONS BEFORE IT!
  const config = {
    reference: new Date().getTime().toString() + Math.floor(Math.random() * 1000000),
    email: userEmail,
    amount: 39900, // ₵399 in kobo
    publicKey: 'pk_test_7f55c7f5217c01e854a87f5b4f4f30f1b5889b5e',
    metadata: { plan: 'Pro', domain: 'ghanaads.store' }
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    confetti({
      particleCount: 500,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#CE1126', '#FCD116', '#006B3F', '#000000']
    });
    alert(`Payment Successful! Ref: ${reference.reference}\nWelcome to PRO!`);
    localStorage.setItem('isProUser', 'true');
    localStorage.setItem('userPlan', 'Pro');
    onClose();
    window.location.reload();
  };

  const onClosePaystack = () => console.log("Payment closed");

  // NOW we can safely check isOpen
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="glass-card rounded-3xl p-12 max-w-5xl w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="float-right mb-8">
          <X size={48} className="text-white/80 hover:text-white" />
        </button>

        <h2 className="text-6xl font-black text-center text-yellow-400 mb-16 clear-both">
          Upgrade to PRO – Dominate Ghana
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Starter */}
          <div className="glass-card p-10 text-center hover:scale-105 transition">
            <h3 className="text-4xl font-black mb-6">Starter</h3>
            <p className="text-7xl font-black mb-8">₵199<span className="text-3xl">/mo</span></p>
            <button
              onClick={() => initializePayment(onSuccess, onClosePaystack)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-600 text-black py-8 rounded-3xl text-3xl font-black hover:scale-110 transition shadow-2xl"
            >
              Pay ₵199 → Starter
            </button>
          </div>

          {/* PRO — MOST POPULAR */}
          <div className="glass-card p-12 text-center ring-8 ring-yellow-400 ring-offset-8 ring-offset-black scale-110 shadow-3xl">
            <div className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full mb-8 text-xl">
              MOST POPULAR
            </div>
            <h3 className="text-5xl font-black mb-6">Pro (Ghana)</h3>
            <p className="text-8xl font-black mb-8">₵399<span className="text-4xl">/mo</span></p>
            <ul className="text-left space-y-4 mb-12 text-white/95 text-lg">
              <li><strong>Unlimited AI Posts</strong></li>
              <li>Auto-post to Instagram & Facebook</li>
              <li>Competitor spy tool</li>
              <li>Advanced analytics</li>
              <li>Priority WhatsApp support</li>
            </ul>
            <button
              onClick={() => initializePayment(onSuccess, onClosePaystack)}
              className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-black py-10 rounded-3xl text-4xl font-black hover:scale-110 transition shadow-2xl"
            >
              Pay ₵399 → Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="glass-card p-10 text-center hover:scale-105 transition">
            <h3 className="text-4xl font-black mb-6">Enterprise</h3>
            <p className="text-7xl font-black mb-8">₵999<span className="text-3xl">/mo</span></p>
            <button
              onClick={() => initializePayment(onSuccess, onClosePaystack)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 rounded-3xl text-3xl font-black hover:scale-110 transition shadow-2xl"
            >
              Pay ₵999 → Enterprise
            </button>
          </div>
        </div>

        <div className="text-center mt-16">
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;