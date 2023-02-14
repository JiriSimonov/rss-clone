export interface LobbyOptions {
  maxUsers: number;
  rounds: number;
  lobbyName: string;
  lobbyOwner: string;
  lobbyImage: string;
  password?: string;
  private?: boolean;
}

//! вот такое теперь отправляется при получении списка всех лобби.
//! количество юзеров и тип приватности передаются уже вычисленными
//! LobbyState/LobbyOptions
/* export interface ILobbyData {
  uuid: string;
  lobbyImage: string;
  lobbyOwner: string;
  privacyType: LobbyPrivacyType; //! <---
  lobbyName: string;
  currentUsers: number; //! <---
  maxUsers: number;
  rounds: number;
} */

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
  isPrivate?: boolean | string;
  nameContains?: string;
}
