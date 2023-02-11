export interface LobbyOptions {
  maxUsers: number;
  rounds: number;
  lobbyName: string;
  lobbyOwner: string;
  lobbyImage: string;
  password?: string;
}

export interface LobbyState extends LobbyOptions {
  uuid: string;
  players: Record<Player['username'], Player>;
}

export interface Player {
  username: string;
  score: number | string;
}

export interface LobbyListOptions {
  chunk?: {
    page: number;
    limit: number;
  };
  private?: boolean;
}
