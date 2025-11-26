// src/pages/CalendarPage.js
import React from 'react';
import { Calendar, Flame } from 'lucide-react';

const GHANA_HOLIDAYS_2025 = [
  { date: '2025-01-01', name: 'New Year’s Day', color: 'text-red-500' },
  { date: '2025-03-06', name: 'Independence Day', color: 'text-yellow-400' },
  { date: '2025-04-18', name: 'Good Friday', color: 'text-red-600' },
  { date: '2025-04-21', name: 'Easter Monday', color: 'text-green-500' },
  { date: '2025-05-01', name: 'Workers’ Day', color: 'text-blue-500' },
  { date: '2025-12-25', name: 'Christmas Day', color: 'text-green-400' },
  { date: '2025-12-26', name: 'Boxing Day', color: 'text-yellow-500' },
];

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-6xl font-black text-center mb-12 text-yellow-400 flex items-center justify-center gap-6">
        <Calendar size={70} /> Ghana Content Calendar 2025–2026
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass-card p-10">
          <h3 className="text-4xl font-black mb-8 text-green-400">National Holidays (Post = 10× Engagement)</h3>
          {GHANA_HOLIDAYS_2025.map(h => (
            <div key={h.date} className="flex justify-between items-center py-5 border-b border-white/20">
              <p className={`text-2xl font-bold ${h.color}`}>{h.name}</p>
              <p className="text-xl text-white/80">{h.date}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-10">
          <h3 className="text-4xl font-black mb-8 text-red-400 flex items-center gap-4">
            <Flame size={50} /> Best Posting Days in Ghana
          </h3>
          <div className="space-y-6 text-2xl">
            <p><strong>Monday 7:30 PM</strong> → Highest engagement</p>
            <p><strong>Wednesday 8:00 PM</strong> → Second best</p>
            <p><strong>Friday 6:00 PM</strong> → Weekend prep</p>
            <p><strong>Sunday 9:00 AM</strong> → Church crowd</p>
          </div>
        </div>
      </div>
    </div>
  );
}