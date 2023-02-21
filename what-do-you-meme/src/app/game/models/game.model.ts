export enum GameStatus {
  Prepare = 'prepare',
  Situation = 'situation',
  Vote = 'vote',
  Vote_results = 'vote-results',
  End = 'end',
}

type MemeList = {
  [meme: string]: string[];
}

export interface Player {
  username: string;
  score: number;
  image: string;
  meme: string;
  vote: string;
}

type playerObject = Record<Player['username'], Player>

export interface GameLobbyData {

  title: string;
  password: string;
  players: playerObject;
  status: string;
  currentRound: number;
}

export interface GameCurrentData extends Pick<GameLobbyData, 'players' | 'status'> {
  currentRound: number;
  rounds: string[];
  memes: MemeList;
  votes: MemeList;
}
