
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../providers';
import { Eye, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Eye className="w-10 h-10 text-neon-green" />
            <h1 className="text-3xl font-black tracking-tighter italic text-white">
              We'll<span className="text-neon-green">SEE</span>
            </h1>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-6 text-center">Login to the Arena</h2>
        
        {error && <div className="bg-neon-red/10 text-neon-red p-3 rounded-lg text-sm font-bold mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 text-white focus:border-neon-green outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 text-white focus:border-neon-green outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ENTER'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-neon-green hover:underline font-bold">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
