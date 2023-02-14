export interface createLobby {
  maxPlayers: number;
  maxRound: number;
  title: string;
  owner: string;
  image: string;
  password: string;
  private?: string;
}