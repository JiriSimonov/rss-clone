export enum LobbiesPrivacy {
  private = 'private',
  public = 'public',
  all = 'all',
}

export interface LobbyData {
  uuid: string;
  image: string;
  owner: string;
  title: string;
  maxPlayers: number;
  maxRounds: number;
  playersCount: number;
  timerDelay: number;
  privacyType: LobbiesPrivacy;
  players: userSocketData[];
  isFull: boolean;
}

export interface userSocketData {
  username: string;
  image: string
}

