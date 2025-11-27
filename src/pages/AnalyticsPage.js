// src/pages/AnalyticsPage.js
import React from 'react';
import { TrendingUp, Users, MessageCircle, Share2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center mb-16 text-yellow-400">Your Growth Analytics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="glass-card p-8 text-center">
          <Users className="mx-auto mb-4 text-green-400" size={60} />
          <p className="text-6xl font-black text-green-400">+2,847</p>
          <p className="text-xl">New Followers</p>
        </div>
        <div className="glass-card p-8 text-center">
          <MessageCircle className="mx-auto mb-4 text-blue-400" size={60} />
          <p className="text-6xl font-black text-blue-400">+418%</p>
          <p className="text-xl">Messages</p>
        </div>
        <div className="glass-card p-8 text-center">
          <Share2 className="mx-auto mb-4 text-purple-400" size={60} />
          <p className="text-6xl font-black text-purple-400">+692%</p>
          <p className="text-xl">Shares</p>
        </div>
        <div className="glass-card p-8 text-center">
          <TrendingUp className="mx-auto mb-4 text-yellow-400" size={60} />
          <p className="text-6xl font-black text-yellow-400">#1</p>
          <p className="text-xl">In Your Category</p>
        </div>
      </div>

      <div className="glass-card p-12 text-center">
        <h3 className="text-5xl font-black mb-8">Your Posts vs Average Ghana Business</h3>
        <div className="text-8xl font-black text-green-400">4.8× MORE ENGAGEMENT</div>
      </div>
    </div>
  );
}