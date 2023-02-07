export interface LobbyOptions {
  maxUsers: number;
  rounds: number;
  lobbyName: string;
}

export interface LobbyInfo extends LobbyOptions {
  id?: number;
  joinedUsers: number;
}
