// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghanaads-backend-psqwd0lgd-ghboy1s-projects.vercel.app/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = customers.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);

  if (loading) return <div className="text-center text-6xl mt-40">Loading Admin...</div>;

  return (
    <div className="min-h-screen bg-black/95 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-7xl font-black text-center mb-4 text-yellow-400">
          ADMIN DASHBOARD
        </h1>
        <p className="text-3xl text-center text-green-400 mb-12">
          Total Revenue: ₵{total.toFixed(2)} | {customers.length} Customers
        </p>

        <div className="glass-card p-10 rounded-3xl">
          {customers.length === 0 ? (
            <p className="text-center text-4xl text-gray-400">No payments yet — first sale coming soon!</p>
          ) : (
            <div className="space-y-6">
              {customers.map((c, i) => (
                <div key={i} className="flex justify-between items-center py-6 border-b border-white/20">
                  <div>
                    <p className="text-3xl font-bold text-white">{c.email}</p>
                    <p className="text-xl text-green-400">{c.plan} • ₵{c.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-yellow-400">PAID</p>
                    <p className="text-lg text-gray-400">{c.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}