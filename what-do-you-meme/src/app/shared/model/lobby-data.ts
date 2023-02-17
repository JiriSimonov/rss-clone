export enum LobbiesPrivate {
  private = 'private',
  public = 'public',
  all = 'all',
}

export interface Player {
  username: string;
  score: number;
}

export interface LobbyData {
  uuid: string;
  image: string;
  owner: string;
  title: string;
  maxPlayers: number;
  maxRounds: number;
  playersQuantity: number;
  privacyType: LobbiesPrivate;
}

