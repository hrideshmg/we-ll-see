import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../providers";
import PostCard from "../../components/PostCard";
import {
  Trophy,
  Target,
  Flame,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { users } from "../../services/api";
import { User } from "../../types";

export default function Page() {
  const { user: currentUser, posts, logout } = useApp();
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (username) {
      setLoading(true);
      users
        .get(username)
        .then((u) => setProfileUser(u))
        .catch(() => setProfileUser(null)) // Handle not found
        .finally(() => setLoading(false));
    } else {
      setProfileUser(currentUser);
    }
  }, [username, currentUser]);

  if (loading || !profileUser) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile...</div>
    );
  }

  const handleSave = async () => {
    try {
      const updated = await users.update({
        name: profileUser.name,
        username: profileUser.username,
        email: profileUser.email,
      });

      setProfileUser(updated);
      setShowEdit(false);
    } catch (error: any) {
      alert(
        error.response?.data?.username ||
          error.response?.data?.email ||
          "Failed to update"
      );
    }
  };

  const myPlans = posts.filter((p) => p.user === profileUser.id);
  const completed = myPlans.filter((p) => p.status === "completed").length;
  const consistencyData = [40, 70, 30, 85, 60, 90, 50, 80, 65, 45, 95, 100]; // Mock data visualization

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-brand-card border border-brand-border rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neon-purple/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full mx-auto border-4 border-brand-dark shadow-2xl mb-4 bg-zinc-800 flex items-center justify-center text-4xl font-black text-gray-600">
              {profileUser.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute bottom-4 right-0 bg-brand-dark rounded-full p-1 border border-brand-border">
              <div className="bg-neon-green w-4 h-4 rounded-full border-2 border-brand-dark"></div>
            </div>
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight">
            {profileUser.username}
          </h1>
          <div className="inline-block bg-zinc-800 px-4 py-1.5 rounded-full text-xs font-black text-neon-green uppercase tracking-widest mt-3 border border-zinc-700 shadow-lg">
            Level {Math.floor(profileUser.karma / 100)}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <Trophy className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="text-2xl font-black text-white">
                {profileUser.karma.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Karma
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <Target className="w-5 h-5 text-neon-green mb-2" />
              <span className="text-2xl font-black text-white">
                {completed}
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Proven
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <Flame className="w-5 h-5 text-orange-500 mb-2" />
              <span className="text-2xl font-black text-white">5</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      {currentUser?.id === profileUser.id && (
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => setShowEdit(true)}
            className="block text-left py-4 px-4 text-xl font-bold text-neon-purple border border-zinc-800 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 transition"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Stats & Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card border border-brand-border p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="w-24 h-24 text-neon-green" />
          </div>
          <h3 className="text-gray-400 font-bold uppercase text-xs mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neon-green" /> Consistency
            Visualizer
          </h3>
          <div className="flex gap-2 h-32 items-end px-2">
            {consistencyData.map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col justify-end h-full group/bar"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="bg-zinc-800 group-hover/bar:bg-neon-green rounded-t-md transition-all duration-300 relative"
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col justify-center relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                <span>Success Rate</span>
                <span className="text-white">84%</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full w-[84%] bg-gradient-to-r from-neon-green to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div>
        <h3 className="text-xl font-black text-white italic mb-6 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-neon-purple" />{" "}
          {username ? `${username}'s` : "MY"} LOG
        </h3>
        {myPlans.length > 0 ? (
          <div className="space-y-6">
            {myPlans.map((plan) => (
              <PostCard
                key={plan.id}
                plan={plan}
                isCurrentUser={currentUser?.id === plan.user}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <Target className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">No Plans Declared</h3>
            <p className="text-gray-500 mt-1">The arena is waiting.</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={logout}
          className="block text-left py-4 px-4 text-xl font-bold text-neon-red border border-zinc-800 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl w-full max-w-sm space-y-4">
            <h2 className="text-xl font-black text-white">Edit Profile</h2>

            <input
              type="text"
              defaultValue={profileUser.name}
              onChange={(e) =>
                setProfileUser({ ...profileUser, name: e.target.value })
              }
              placeholder="Name"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
            />

            <input
              type="text"
              defaultValue={profileUser.username}
              onChange={(e) =>
                setProfileUser({ ...profileUser, username: e.target.value })
              }
              placeholder="Username"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
            />

            <input
              type="email"
              defaultValue={profileUser.email}
              onChange={(e) =>
                setProfileUser({ ...profileUser, email: e.target.value })
              }
              placeholder="Email"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 text-sm border border-zinc-700 rounded-xl text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-bold bg-neon-green text-black rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
