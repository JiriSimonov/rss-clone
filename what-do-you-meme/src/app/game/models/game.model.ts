import { LobbyData, Player } from "src/app/shared/model/lobby-data";

export interface gameLobbyData extends LobbyData {
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
