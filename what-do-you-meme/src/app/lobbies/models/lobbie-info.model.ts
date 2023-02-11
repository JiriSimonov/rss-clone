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
  players: Record<Player['username'], Player>
}

export interface Player {
  username: string;
  score: number | string;
} 

// username || string
// score || string | number

// {
//   "uuid": "84831fb5-1cd5-4bde-964f-daf4a86966b4",
//   "players": {},
//   "maxUsers": "2",
//   "rounds": "1",
//   "lobbyName": "dsad",
//   "private": "",
//   "password": "",
//   "lobbyImage": "https://wdym-js-er-sd.onrender.com/file/images/avatars/0",
//   "lobbyOwner": "medoed"
// }