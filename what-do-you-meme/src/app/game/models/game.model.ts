import {Player} from "src/app/lobbies/model/lobby-data";

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

export interface GamePlayer extends Player {
  image: string;
  meme: string;
  vote: string;
}

type playerObject = Record<GamePlayer['username'], GamePlayer>

export interface GameLobbyData extends LobbyData {

  title: string;
  password: string;
  players: playerObject;
  status: string;
  currentRound: number;
}

export interface GameCurrentData extends Pick<GameLobbyData, 'players' | 'status'> {
  currentRound: number;
  rounds: string[];
  memes: MemeList; // {'meme1':['oleg','petr'],'meme2':[egor]}
  votes: MemeList;
}
