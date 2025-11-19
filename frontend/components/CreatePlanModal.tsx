
import React, { useState } from 'react';
import { X, Target, Calendar, AlertCircle, Loader2, Upload } from 'lucide-react';
import { analyzePlanQuality } from '../services/geminiService';
import { posts } from '../services/api';
import { useApp } from '../app/providers';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePlanModal: React.FC<CreatePlanModalProps> = ({ isOpen, onClose }) => {
  const { refreshPosts } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ score: number; feedback: string } | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!description) return;
    setIsAnalyzing(true);
    try {
        const result = await analyzePlanQuality(description);
        setAiFeedback(result);
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    // Combine title and description for API 'content' field
    formData.append('content', `${title} :: ${description}`);
    formData.append('deadline', deadline);
    if (image) {
      formData.append('image', image);
    }

    try {
      await posts.create(formData);
      await refreshPosts();
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setDeadline('');
      setImage(null);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-brand-dark border border-brand-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Target className="text-neon-green" /> Declare Your Intent
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">The Goal (Title)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Run a Marathon"
              className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">The Specifics</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleAnalyze}
              placeholder="Describe exactly what 'done' looks like."
              className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all resize-none"
            />
            {isAnalyzing && (
                <div className="flex items-center gap-2 mt-2 text-xs text-neon-purple">
                    <Loader2 className="w-3 h-3 animate-spin" /> Analyzing goal quality...
                </div>
            )}
            {aiFeedback && !isAnalyzing && (
                <div className={`mt-2 p-3 rounded-lg text-xs border ${aiFeedback.score > 7 ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}`}>
                    <div className="font-bold mb-1">Goal Quality Score: {aiFeedback.score}/10</div>
                    <div>{aiFeedback.feedback}</div>
                </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deadline</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 pl-10 text-white focus:border-neon-green outline-none"
                    />
                </div>
            </div>
            <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cover Image</label>
                 <label className="w-full bg-zinc-900 border border-brand-border rounded-xl p-3 text-white flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors">
                    <Upload className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-xs text-gray-400 truncate">{image ? image.name : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                 </label>
            </div>
          </div>
          
          <div className="bg-zinc-800/50 p-3 rounded-lg flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
            <p className="text-xs text-gray-400">
                Once posted, you cannot delete this without a massive Karma penalty. 
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post to Arena'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;
