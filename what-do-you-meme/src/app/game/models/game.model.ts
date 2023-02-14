export interface LobbyData {
  uuid: string;
  title: string;
  password: string;
  owner: string;
  image: string;
  maxPlayers: number;
  maxRounds: number;
  players: Record<Player['username'], Player>;
  status: string;
  currentRound: number;
}

export interface Player {
  username: string;
  score: number | string;
  image: string;
  meme: string;
}

export interface LobbyListOptions {
  chunk?: {
    page: number;
    limit: number;
  };
  isPrivate?: boolean | string;
  nameContains?: string;
}
