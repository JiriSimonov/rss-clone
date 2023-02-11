export interface LobbyOptions {
  maxUsers: number;
  rounds: number;
  lobbyName: string;
  lobbyOwner: string;
  lobbyImage: string;
  password?: string;
}

export interface LobbyInfo extends LobbyOptions {
  id?: number;
  joinedUsers: number;
}
