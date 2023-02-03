export interface LobbyOptions {
  totalUsers: number;
  rounds: number;
}

export interface LobbyInfo extends LobbyOptions {
  id?: number;
  joinedUsers: number;
}
