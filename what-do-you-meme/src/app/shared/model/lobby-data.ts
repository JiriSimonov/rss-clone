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
  privacyType: LobbiesPrivate; 
  title: string; 
  playersQuantity: number; 
  maxPlayers: number; 
  maxRounds: number; 
}