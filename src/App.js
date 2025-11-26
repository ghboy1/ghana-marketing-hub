// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Calendar, TrendingUp, BarChart3, Brain, LogOut,
  Sparkles, Flame, Trophy, Zap, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PricingModal from './components/PricingModal';
import './App.css';

// Ghana Hashtags & Templates
const GHANA_VIRAL_HASHTAGS = {
  trending: ['#GhanaTwitter', '#Accra', '#Kumasi', '#Ghana', '#VisitGhana'],
  business: ['#GhanaBusiness', '#SupportLocalGH', '#MadeInGhana', '#AccraEntrepreneur']
};

const AI_POST_TEMPLATES = [
  "Just dropped fresh heat for the Ghanaian hustle! Who's grabbing first?",
  "Independence Day vibes loading... Massive discounts coming soon!",
  "Tag a friend who needs to see this Ghanaian excellence!",
  "From Accra with love — supporting local never looked this good",
  "When Ghana does it, we do it BETTER. Proudly Made in Ghana",
  "Your weekend plans just got upgraded — come through!"
];

/* ——— LOGIN PAGE ——— */
const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!name.trim()) return alert("Please enter your business name");
    const userData = { businessName: name.trim() };
    localStorage.setItem('ghanaUser', JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <div className="min-h-screen ghana-gradient flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-block p-8 bg-black/50 rounded-full mb-8 animate-pulse">
          <span className="text-9xl">Black Star</span>
        </div>
        <h1 className="text-6xl font-black text-white mb-4">GHANA MARKETING HUB</h1>
        <p className="text-2xl text-yellow-300 font-bold mb-12">Get More Customers. Ghana First.</p>

        <input
          type="text"
          placeholder="Your Business Name"
          className="w-full glass-input text-xl py-5 mb-6 text-white placeholder-white/60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />

        <button
          onClick={handleLogin}
          className="w-full btn-ghana text-3xl py-6 font-black shadow-2xl hover:scale-105 transition"
        >
          LAUNCH MY DASHBOARD
        </button>

        <p className="mt-10 text-white/70 text-lg">Used by 500+ Ghanaian businesses</p>
      </div>
    </div>
  );
};

/* ——— MAIN APP ——— */
const MainApp = () => {
  // Auto-login from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ghanaUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [page, setPage] = useState('dashboard');
  const [showComposer, setShowComposer] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [postContent, setPostContent] = useState('');

  // PRO Status
  const isProUser = localStorage.getItem('isProUser') === 'true';
  const userPlan = localStorage.getItem('userPlan') || 'Free';

  const generateAIPost = () => {
    const template = AI_POST_TEMPLATES[Math.floor(Math.random() * AI_POST_TEMPLATES.length)];
    const hashtags = [
      ...GHANA_VIRAL_HASHTAGS.trending.slice(0, 3),
      ...GHANA_VIRAL_HASHTAGS.business.slice(0, 2),
      '#MadeInGhana', '#SupportLocalGH'
    ];
    setPostContent(`${template}\n\n${hashtags.join(' ')}`);
  };

  const schedulePost = () => {
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#CE1126', '#FCD116', '#006B3F']
    });
    setShowComposer(false);
    alert("Post scheduled for 7:30 PM — Best time in Ghana!");
  };

  const handleLogout = () => {
    localStorage.removeItem('ghanaUser');
    localStorage.removeItem('isProUser');
    localStorage.removeItem('userPlan');
    setUser(null);
  };

  // Show login if no user
  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 text-white">
      <div className="ghana-flag-strip"></div>

      {/* Header */}
      <header className="glass-header border-b border-yellow-500/20">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-yellow-400 text-4xl">Black Star</div>
            <div>
              <h1 className="text-2xl font-bold">{user.businessName}</h1>
              <p className="text-yellow-400 font-bold text-lg">{userPlan.toUpperCase()} PLAN</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-lg">
            <LogOut size={22} /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass-sidebar p-6 space-y-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, color: 'text-green-400' },
            { id: 'ai', label: 'AI Writer', icon: Brain, color: 'text-purple-400' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-yellow-400' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${page === item.id ? 'bg-yellow-500/20 border-2 border-yellow-500' : 'hover:bg-white/10'}`}
            >
              <item.icon className={item.color} size={28} />
              <span className="text-xl font-bold">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {page === 'dashboard' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-6xl font-black mb-4">Welcome Back, Ghana!</h2>
                <p className="text-3xl text-yellow-400">Today is a great day to grow</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 text-center"><Flame className="mx-auto mb-4 text-orange-500" size={70} /><p className="text-6xl font-black text-orange-400">+89%</p><p className="text-xl">Growth</p></div>
                <div className="glass-card p-10 text-center"><Trophy className="mx-auto mb-4 text-yellow-500" size={70} /><p className="text-6xl font-black text-yellow-400">#1</p><p className="text-xl">In Category</p></div>
                <div className="glass-card p-10 text-center"><Zap className="mx-auto mb-4 text-green-500" size={70} /><p className="text-6xl font-black text-green-400">4.8×</p><p className="text-xl">Engagement</p></div>
              </div>

              <div className="glass-card p-12 text-center">
                <h3 className="text-5xl font-bold mb-10 flex items-center justify-center gap-4">
                  <Sparkles className="text-yellow-400" size={50} /> AI Post Generator
                </h3>

                {isProUser ? (
                  <button
                    onClick={() => { generateAIPost(); setShowComposer(true); }}
                    className="w-full max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 py-10 rounded-3xl text-4xl font-black hover:scale-105 transition shadow-2xl"
                  >
                    Generate Unlimited Viral Posts
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => setShowPricing(true)}
                      className="w-full max-w-3xl mx-auto bg-gradient-to-r from-yellow-400 to-red-600 text-black py-10 rounded-3xl text-4xl font-black hover:scale-110 transition shadow-2xl"
                    >
                      Unlock Unlimited AI Posts – Upgrade to PRO
                    </button>
                    <p className="mt-8 text-gray-400 text-xl">Free plan: 3 posts/month only</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {page === 'ai' && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl font-black text-center mb-16">Ghana AI Post Writer</h2>
              <div className="glass-card p-16">
                <textarea
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder="Let AI write your next viral post..."
                  className="w-full h-80 glass-input text-2xl p-8 rounded-3xl mb-10 resize-none"
                />
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <button onClick={generateAIPost} className="btn-ghana text-3xl py-8 font-black">
                    Generate New Post
                  </button>
                  <button onClick={() => setShowComposer(true)} className="bg-white/20 backdrop-blur border-4 border-yellow-500 text-3xl py-8 rounded-3xl font-bold hover:bg-white/30 transition">
                    Schedule This Post
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-400 mb-4">Best Time to Post:</p>
                  <p className="text-7xl font-black">7:30 PM Tonight</p>
                  <p className="text-2xl text-green-400 mt-6">Your audience is 4× more active!</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6" onClick={() => setShowComposer(false)}>
          <div className="glass-card rounded-3xl p-12 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowComposer(false)} className="float-right"><X size={40} /></button>
            <h2 className="text-5xl font-black text-center mb-10">Your Viral Post is Ready!</h2>
            <div className="bg-white/10 rounded-3xl p-10 mb-10 text-3xl leading-relaxed whitespace-pre-line">
              {postContent || "Click Generate to create magic"}
            </div>
            <button onClick={schedulePost} className="w-full btn-ghana text-4xl py-10 font-black">
              Schedule for 7:30 PM (Best Time)
            </button>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        userEmail="huseinrauf0@gmail.com"
      />
    </div>
  );
};

export default MainApp;