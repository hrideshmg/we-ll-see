import React, { useState, useEffect } from "react";
import { Post } from "../types";
import {
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bot,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { generateAIReaction } from "../services/geminiService";
import { posts } from "../services/api";
import { BACKEND_MEDIA_PATH } from "@/constants";

interface PostCardProps {
  plan: Post;
  isCurrentUser: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ plan, isCurrentUser, user }) => {
  const [believers, setBelievers] = useState(plan.believes);
  const [doubters, setDoubters] = useState(plan.doubts);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);
  const [showProofUpload, setShowProofUpload] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [postStatus, setPostStatus] = useState(plan.status);
  // const [proofState, setProofState] = useState

  useEffect(() => {
    if (user) {
      console.log(user.username);
    }
    if (plan && plan.proof_media){
      // setShowProofUpload(false)
      //
    } else {
      // setShowProofUpload(true)
      //
    }
  }, []);

  // Split content "Title :: Description"
  const parts = plan.content.split(" :: ");
  const title = parts.length > 1 ? parts[0] : "Plan";
  const description =
    parts.length > 1 ? parts.slice(1).join(" :: ") : plan.content;

  const totalVotes = believers + doubters;
  const believePercent =
    totalVotes === 0 ? 50 : Math.round((believers / totalVotes) * 100);

  const handleVote = async (type: "BELIEVE" | "DOUBT") => {
    if (hasVoted) return;
    try {
      await posts.interact({ post_id: plan.id, interaction_type: type });
      if (type === "BELIEVE") setBelievers((prev) => prev + 1);
      else setDoubters((prev) => prev + 1);
      setHasVoted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadProof = async () => {
    if (!proofFile) return;
    const fd = new FormData();
    fd.append("proof_media", proofFile);
    fd.append("status", "wellsee");

    try {
      await posts.update(plan.id, fd);
      if (user && user.username == "admin"){
      setPostStatus("completed");
      }
      setShowProofUpload(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleApprove = async () => {
    const fd = new FormData();
    fd.append("status", "completed");
    try {
      await posts.update(plan.id, fd);
      setPostStatus("completed");
    } catch (e) {
      console.error(e);
    }
  };

  const triggerAIComment = async (type: "hater" | "believer") => {
    setIsGeneratingComment(true);
    try {
      const text = await generateAIReaction(title, description, type);
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          userId: "ai-bot",
          username: type === "hater" ? "AI Doubter" : "AI Hype",
          text,
          isHater: type === "hater",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsGeneratingComment(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 mb-6 hover:border-zinc-600 transition-colors relative overflow-hidden group">
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        {postStatus === "completed" ? (
          <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-xs font-bold border border-neon-green/50 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> PROVEN
          </span>
        ) : (
          <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/50 flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3" /> WELLSEE
          </span>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-brand-border bg-zinc-800 flex items-center justify-center text-gray-500 text-xs font-bold">
          #{plan.user}
        </div>
        <div>
          <h3 className="font-bold text-white text-lg leading-none">
            User {plan.user}
          </h3>
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            The Challenger
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-white mb-2 italic">
          {title}
        </h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>

        {plan.image && (
          <div className="mt-4 rounded-xl overflow-hidden border border-zinc-800">
            <img
              src={BACKEND_MEDIA_PATH + plan.image}
              alt="Plan Goal"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Deadline:{" "}
          {new Date(plan.deadline).toLocaleDateString()}
        </div>
      </div>

      {/* Proof Section */}
      {plan.proof_media && (
        <div className="mb-6 mt-4 rounded-xl overflow-hidden border border-neon-green/30 relative">
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Proof of Execution
          </div>
          <img
            src={BACKEND_MEDIA_PATH + plan.proof_media}
            alt="Proof"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {isCurrentUser && postStatus === "wellsee" && (
        <div className="mb-6">
          {!showProofUpload ? (
            <button
              onClick={() => setShowProofUpload(true)}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded text-white flex items-center gap-2"
            >
              <CheckCircle className="w-3 h-3" /> Mark as Complete (Upload
              Proof)
            </button>
          ) : (
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 flex gap-2 items-center">
              <input
                type="file"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                className="text-xs text-gray-400"
              />
              <button
                onClick={handleUploadProof}
                className="bg-neon-green text-black text-xs px-3 py-1 rounded font-bold"
              >
                Submit
              </button>
              <button
                onClick={() => setShowProofUpload(false)}
                className="text-gray-500 text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Voting Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
          <span className="text-neon-green">{believers} Believers</span>
          <span className="text-neon-red">{doubters} Doubters</span>
        </div>
        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex relative">
          <div
            style={{ width: `${believePercent}%` }}
            className="h-full bg-neon-green transition-all duration-500 relative"
          ></div>
          <div className="flex-1 bg-neon-red relative"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => handleVote("BELIEVE")}
          disabled={hasVoted}
          className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            hasVoted
              ? "bg-zinc-800 text-gray-600 cursor-not-allowed"
              : "bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          BELIEVE
        </button>

        <button
          onClick={() => handleVote("DOUBT")}
          disabled={hasVoted}
          className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            hasVoted
              ? "bg-zinc-800 text-gray-600 cursor-not-allowed"
              : "bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          DOUBT
        </button>

        {!isCurrentUser && (
          <div className="flex gap-1">
            <button
              onClick={() => triggerAIComment("hater")}
              disabled={isGeneratingComment}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-neon-red hover:bg-neon-red/10 transition-colors"
              title="Summon AI Hater"
            >
              <Bot className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Comments Section (Preview) */}
      {comments.length > 0 && (
        <div className="mt-6 pt-6 border-t border-brand-border space-y-3">
          {comments.slice(-3).map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-3 text-sm p-3 rounded-lg ${
                comment.isHater
                  ? "bg-neon-red/5 border border-neon-red/10"
                  : "bg-zinc-800/50"
              }`}
            >
              <div
                className={`font-bold ${
                  comment.isHater ? "text-neon-red" : "text-gray-300"
                }`}
              >
                {comment.username}:
              </div>
              <div className="text-gray-400 flex-1">{comment.text}</div>
            </div>
          ))}
        </div>
      )}

      {(user && user.username ) == "admin" && postStatus === "wellsee" && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleApprove} // <-- you need to implement this
            className="block text-left py-4 px-4 text-xl font-bold bg-neon-green/20 text-neon-green border border-neon-green/50 rounded-2xl hover:bg-zinc-900/70 transition"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
