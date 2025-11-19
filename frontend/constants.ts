
import { Plan, PlanStatus, User, LeaderboardEntry } from './types';

export const MOCK_USER: User = {
  id: 1,
  username: 'AlexChase',
  email: 'alex@example.com',
  name: 'Alex Chase',
  bio: 'Just a dreamer.',
  avatarUrl: 'https://picsum.photos/seed/alex/200/200',
  karma: 1250,
  title: 'Underdog',
};

export const MOCK_PLANS: Plan[] = [
  {
    id: 1,
    user: 2,
    username: 'SarahG',
    content: 'Run a sub-3 hour marathon :: I have been training for 4 months. The race is this Sunday. I will post my official time chip photo.',
    deadline: '2023-11-15T12:00:00Z',
    believes: 142,
    doubts: 89,
    status: PlanStatus.ACTIVE,
    image: null,
    proof_media: null,
  },
  {
    id: 2,
    user: 4,
    username: 'CodeMaster',
    content: 'Launch my SaaS MVP in 7 days :: No sleep until "Ship It". Building a We ensure tool for designers.',
    deadline: '2023-11-12T23:59:00Z',
    believes: 45,
    doubts: 120,
    status: PlanStatus.ACTIVE,
    image: null,
    proof_media: null,
  },
  {
    id: 3,
    user: 1,
    username: 'AlexChase',
    content: 'Learn French to B2 level :: Exam is booked. Proof will be the certificate.',
    deadline: '2023-12-20T10:00:00Z',
    believes: 12,
    doubts: 4,
    status: PlanStatus.COMPLETED,
    proof_media: 'https://picsum.photos/seed/cert/800/600',
    image: null
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { 
    rank: 1, 
    user: { id: 2, username: 'SarahG', email: 'sarah@test.com', name: 'Sarah', bio: 'Runner', avatarUrl: 'https://picsum.photos/seed/sarah/200/200', karma: 3400, title: 'Iron Will' }, 
    plansCompleted: 42, 
    streak: 12 
  },
  { 
    rank: 2, 
    user: { id: 5, username: 'GymRat99', email: 'gym@test.com', name: 'Gym Rat', bio: 'Lifting', avatarUrl: 'https://picsum.photos/seed/gym/200/200', karma: 3150, title: 'Grinder' }, 
    plansCompleted: 38, 
    streak: 8 
  },
  { 
    rank: 3, 
    user: { id: 6, username: 'CryptoKing', email: 'crypto@test.com', name: 'CK', bio: 'To the moon', avatarUrl: 'https://picsum.photos/seed/crypto/200/200', karma: 2900, title: 'Risk Taker' }, 
    plansCompleted: 15, 
    streak: 2 
  },
  { 
    rank: 4, 
    user: MOCK_USER, 
    plansCompleted: 12, 
    streak: 5 
  },
];

export const BACKEND_MEDIA_PATH = "http://localhost:8000"
