import React, { createContext, useContext, useState, useEffect } from "react";
import { TrendingUp, Medal } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useApp } from "../providers";

import { posts } from "@/services/api";

// Keeping mock data for leaderboard as API endpoint is missing
const MOCK_LEADERBOARD = [
  { rank: 1, username: "SarahG", karma: 3400, plansCompleted: 42, streak: 12 },
  { rank: 2, username: "GymRat99", karma: 3150, plansCompleted: 38, streak: 8 },
  {
    rank: 3,
    username: "CryptoKing",
    karma: 2900,
    plansCompleted: 15,
    streak: 2,
  },
  {
    rank: 4,
    username: "AlexChase",
    karma: 1250,
    plansCompleted: 12,
    streak: 5,
  },
];

export default function Page() {
  const { leaderboard, refreshLeaderboard } = useApp();

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  const chartData = leaderboard.map((entry) => ({
    rank: entry.rank,
    username: entry.username,
    name: entry.username,
    karma: entry.karma, // or whatever field you return
    plansCompleted: entry.plansCompleted
  }));

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          Global Rankings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartData.slice(0, 3).map((entry) => (
          <div
            key={entry.username}
            className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col items-center relative overflow-hidden"
          >
            {entry.rank === 1 && (
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />
            )}
            <div
              className={`absolute top-4 right-4 font-black text-4xl opacity-10 ${getRankColor(
                entry.rank
              )}`}
            >
              #{entry.rank}
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-brand-dark shadow-xl z-10 bg-zinc-800 flex items-center justify-center text-2xl font-bold text-gray-500">
              {entry.username.substring(0, 1)}
            </div>
            <div className="mt-4 text-center relative z-10">
              <h3 className="font-bold text-white text-lg">{entry.username}</h3>
              <div className="text-neon-green font-black text-2xl">
                {entry.karma.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Karma</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-card border border-brand-border p-6 rounded-2xl h-64">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Karma Distribution
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#27272a",
                color: "#fff",
              }}
              itemStyle={{ color: "#10b981" }}
              cursor={{ fill: "#27272a" }}
            />
            <Bar dataKey="karma" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#fbbf24" : "#8b5cf6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">User</th>
              <th className="p-4 text-right">Proven Plans</th>
              <th className="p-4 text-right">Streak</th>
              <th className="p-4 text-right">Karma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {chartData.map((entry) => (
              <tr
                key={entry.username}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-bold text-gray-400">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded ${
                      entry.rank <= 3 ? "bg-white text-black" : ""
                    }`}
                  >
                    {entry.rank}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-3">
                  <span className="font-semibold text-white">
                    {entry.username}
                  </span>
                </td>
                <td className="p-4 text-right text-gray-300">
                  {entry.plansCompleted}
                </td>
                <td className="p-4 text-right">
                  <span className="text-orange-500 font-bold flex items-center justify-end gap-1">
                    <Medal className="w-3 h-3" /> 15
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-bold text-neon-green">
                  {entry.karma.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
