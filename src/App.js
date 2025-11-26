import React, { useState, useEffect, createContext, useContext } from 'react';
import { Calendar, TrendingUp, Users, Target, Plus, Download, LogOut, BarChart3, Clock, Sparkles, X, Menu, Sun, Moon, Flag, Zap, Brain, Trophy, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import './App.css';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Ghana Viral Hashtags Database
const GHANA_VIRAL_HASHTAGS = {
  food: ['#GhanaFood', '#Jollof', '#Waakye', '#FufuAndLightSoup', '#Banku', '#Kelewele', '#RedRed'],
  fashion: ['#GhanaFashion', '#Kente', '#Ankara', '#AfricanPrint', '#MadeInGhana', '#AccraFashion'],
  business: ['#GhanaBusiness', '#SupportLocalGH', '#MadeInGhana', '#AccraEntrepreneur', '#GhanaStartup'],
  culture: ['#ProudlyGhanaian', '#GhanaAt68', '#GhanaVibes', '#BlackStar', '#YearOfReturn'],
  trending: ['#GhanaTwitter', '#Accra', '#Kumasi', '#Ghana', '#VisitGhana', '#GhanaWeDey']
};

const BEST_TIMES_TO_POST = {
  morning: "8:00 AM - 10:00 AM",
  lunch: "1:00 PM - 2:00 PM",
  evening: "6:00 PM - 9:00 PM (BEST)"
};

const mockAnalyticsData = [
  { date: 'Mon', reach: 2400, engagement: 890 },
  { date: 'Tue', reach: 2800, engagement: 1100 },
  { date: 'Wed', reach: 3200, engagement: 1350 },
  { date: 'Thu', reach: 2900, engagement: 980 },
  { date: 'Fri', reach: 3800, engagement: 1650 },
  { date: 'Sat', reach: 4200, engagement: 1980 },
  { date: 'Sun', reach: 3600, engagement: 1520 }
];

const AI_POST_TEMPLATES = [
  "Just dropped new [product/service] — perfect for the Ghanaian hustle! Who's grabbing first?",
  "Independence Day Loading... Get ready for massive discounts! Save this post!",
  "Tag a friend who needs to see this Ghanaian excellence!",
  "From Accra with love — supporting local never looked this good",
  "When Ghana does it, we do it better. Proudly Made in Ghana",
  "Your weekend plans just got better — come through!"
];

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  return (
    <div className="min-h-screen ghana-gradient flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-black/50 rounded-full mb-6 animate-pulse">
            <span className="text-8xl">★</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">GHANA MARKETING HUB</h1>
          <p className="text-2xl text-yellow-300 font-bold">Get More Customers. Ghana First.</p>
        </div>

        <input
          placeholder="Your Business Name"
          className="w-full glass-input text-xl py-5 mb-6"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <button
          onClick={() => onLogin({ businessName: name || "Ghana Business", tier: "pro" })}
          className="w-full btn-ghana text-2xl py-6 font-bold shadow-2xl"
        >
          Launch My Dashboard
        </button>

        <p className="text-center mt-8 text-white/80 text-lg font-medium">
          Used by 500+ Ghanaian businesses
        </p>
      </div>
    </div>
  );
};

const MainApp = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [showComposer, setShowComposer] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook']);

  const generateAIPost = () => {
    const template = AI_POST_TEMPLATES[Math.floor(Math.random() * AI_POST_TEMPLATES.length)];
    const hashtags = [
      ...GHANA_VIRAL_HASHTAGS.trending.slice(0, 2),
      ...GHANA_VIRAL_HASHTAGS.business.slice(0, 2)
    ];
    setPostContent(`${template}\n\n${hashtags.join(' ')}`);
  };

  const schedulePost = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#CE1126', '#FCD116', '#006B3F', '#000000']
    });
    setShowComposer(false);
    alert("Post Scheduled for BEST TIME: 7:30 PM Tonight!\nYour audience is most active then");
  };

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 text-white">
      <div className="ghana-flag-strip"></div>

      {/* Header */}
      <header className="glass-header border-b border-yellow-500/20">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 text-3xl">★</div>
            <div>
              <h1 className="text-2xl font-bold">{user.businessName}</h1>
              <p className="text-yellow-400 font-bold">PRO ACCOUNT • Unlimited Posts</p>
            </div>
          </div>
          <button onClick={() => setUser(null)} className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <LogOut /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass-sidebar p-6 space-y-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, color: 'text-green-400' },
            { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'text-blue-400' },
            { id: 'ai', label: 'AI Writer', icon: Brain, color: 'text-purple-400' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-yellow-400' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${page === item.id ? 'bg-yellow-500/20 border border-yellow-500' : 'hover:bg-white/10'}`}
            >
              <item.icon className={item.color} size={28} />
              <span className="text-xl font-bold">{item.label}</span>
              {item.id === 'ai' && <span className="ml-auto bg-purple-600 px-3 py-1 rounded-full text-xs">NEW</span>}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {page === 'dashboard' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-5xl font-black mb-4">Welcome Back, Ghana!</h2>
                <p className="text-2xl text-yellow-400">Today is a great day to grow your business</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-8 text-center">
                  <Flame className="mx-auto mb-4 text-orange-500" size={60} />
                  <p className="text-5xl font-black text-orange-400">+89%</p>
                  <p className="text-xl">Growth This Month</p>
                </div>
                <div className="glass-card p-8 text-center">
                  <Trophy className="mx-auto mb-4 text-yellow-500" size={60} />
                  <p className="text-5xl font-black text-yellow-400">#1</p>
                  <p className="text-xl">In Your Category</p>
                </div>
                <div className="glass-card p-8 text-center">
                  <Zap className="mx-auto mb-4 text-green-500" size={60} />
                  <p className="text-5xl font-black text-green-400">4.8×</p>
                  <p className="text-xl">More Engagement</p>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Sparkles className="text-yellow-400" /> AI Post Generator (Tap Below)
                </h3>
                <button
                  onClick={() => { generateAIPost(); setShowComposer(true); }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-3xl text-2xl font-bold hover:scale-105 transition"
                >
                  Generate Viral Post in 2 Seconds
                </button>
              </div>
            </div>
          )}

          {page === 'ai' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-black text-center mb-12">Ghana AI Post Writer</h2>
              <div className="glass-card p-12">
                <textarea
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder="Let AI write your next viral post..."
                  className="w-full h-64 glass-input text-xl p-6 rounded-3xl mb-8"
                />
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <button onClick={generateAIPost} className="btn-ghana text-2xl py-6">
                    Generate New Post
                  </button>
                  <button onClick={() => setShowComposer(true)} className="bg-white/20 backdrop-blur border-2 border-yellow-500 text-2xl py-6 rounded-3xl font-bold hover:bg-white/30">
                    Schedule This Post
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400 mb-4">Best Time to Post:</p>
                  <p className="text-5xl font-black">7:30 PM Tonight</p>
                  <p className="text-xl text-green-400 mt-4">Your audience is 4× more active!</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6" onClick={() => setShowComposer(false)}>
          <div className="glass-card rounded-3xl p-10 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-4xl font-black mb-8 text-center">Your Viral Post is Ready!</h2>
            <div className="bg-white/10 rounded-3xl p-8 mb-8">
              <p className="text-2xl whitespace-pre-line">{postContent || "Click Generate to create magic"}</p>
            </div>
            <div className="flex gap-6">
              <button onClick={schedulePost} className="flex-1 btn-ghana text-3xl py-8 font-black">
                Schedule for 7:30 PM (Best Time)
              </button>
              <button onClick={() => setShowComposer(false)} className="px-12 py-8 bg-white/20 rounded-3xl text-2xl font-bold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;