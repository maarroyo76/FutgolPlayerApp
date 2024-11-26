export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    referee: boolean;
    username: string;
    password: string;
}

export interface Team {
  id: number;
  name: string;
  city: string;
  coach: string;
  players: User[];
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsScored: number;
}