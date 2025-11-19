
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  karma: number;
  avatarUrl?: string;
  title?: string;
}

export interface Post {
  id: number;
  user: number; // ID of the user
  username?: string; // Optional, if we can inject it
  content: string;
  deadline: string;
  image: string | null;
  status: 'wellsee' | 'completed';
  proof_media: string | null;
  believes: number;
  doubts: number;
}

export interface Interaction {
  post_id: number;
  interaction_type: 'BELIEVE' | 'DOUBT';
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

// Added to support usages in constants.ts
export type Plan = Post;

export enum PlanStatus {
  ACTIVE = 'wellsee',
  COMPLETED = 'completed'
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  plansCompleted: number;
  streak: number;
}
