export interface Match {
  id: number;
  date: string;
  location: string;
  teams: { teamA: number; teamB: number };
  score: { teamA: number; teamB: number };
  status: 'Scheduled' | 'Ongoing' | 'Finished';
  createdBy: string;
  liveStreamUrl?: string;
  statistics?: MatchStatistics;
}

export interface MatchStatistics {
  goals: Array<{ playerId: number; time: string }>;
  fouls: Array<{ playerId: number; time: string }>;
  yellowCards: Array<{ playerId: number; time: string }>;
  redCards: Array<{ playerId: number; time: string }>;
  possession: { teamA: number; teamB: number };
}
