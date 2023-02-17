import {Player} from "src/app/lobbies/model/lobby-data";

export interface gameLobbyData {
  title: string;
  password: string;
  players: Record<GamePlayer['username'], GamePlayer>;
  status: string;
  currentRound: number;
}

export interface GamePlayer extends Player {
  image: string;
  meme: string;
}
