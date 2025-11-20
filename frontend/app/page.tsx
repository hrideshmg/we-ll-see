
import React, { useState, useEffect } from 'react';
import { useApp } from './providers';
import PostCard from '../components/PostCard';
import { Sparkles, Clock, Filter, CheckCircle2 } from 'lucide-react';

export default function Page() {
  const { posts, user } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredPlans = posts.filter(plan => {
      if (filter === 'active') return plan.status === 'wellsee';
      if (filter === 'completed') return plan.status === 'completed';
      return true;
  });

  useEffect(()=>{
    console.log(filteredPlans)
  },[filteredPlans])
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header for Feed */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter flex items-center gap-3">
                THE ARENA <Sparkles className="w-8 h-8 text-neon-green hidden md:block animate-pulse-slow" />
            </h1>
            <p className="text-gray-400 mt-3 text-base max-w-lg leading-relaxed">
                Prove them wrong. Post your future, tank the hate, and earn your karma in the public eye.
            </p>
        </div>
        
        {/* Filters */}
        <div className="flex bg-zinc-900 p-1.5 rounded-xl border border-brand-border shadow-2xl self-start md:self-auto">
            <button 
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wide ${filter === 'all' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                All
            </button>
            <button 
                onClick={() => setFilter('active')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wide flex items-center gap-2 ${filter === 'active' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                <Clock className="w-3.5 h-3.5" /> Live
            </button>
             <button 
                onClick={() => setFilter('completed')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wide flex items-center gap-2 ${filter === 'completed' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                <CheckCircle2 className="w-3.5 h-3.5" /> Proven
            </button>
        </div>
      </div>

      <div className="space-y-8 min-h-[50vh]">
        {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
                <PostCard key={plan.id} plan={plan} isCurrentUser={plan.user === user?.id} user={user} />
            ))
        ) : (
            <div className="text-center py-24 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Filter className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">No plans found</h3>
                <p className="text-gray-500">Try changing the filter or be the first to post.</p>
            </div>
        )}
      </div>
    </div>
  );
}
