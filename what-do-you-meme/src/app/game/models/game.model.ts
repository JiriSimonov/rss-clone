export enum GameStatus {
  Prepare = 'prepare',
  Situation = 'situation',
  Vote = 'vote',
  Vote_results = 'vote-results',
  End = 'end',
}

type MemeList = {
  [meme: string]: string[];
}

export interface Player {
  username: string;
  score: number;
  image: string;
  meme: string;
  vote: string;
}

type playerObject = Record<Player['username'], Player>

export interface GameCurrentData {
  currentRound: number;
  rounds: string[];
  memes: MemeList;
  players: playerObject;
  status: string;
  votes: MemeList;
}

let gameData: GameCurrentData = {
  currentRound: 0,
  rounds: [''],
  memes: {
    '': ['']
  },
  players: {
    slikedollar: {
      username: '',
      score: 0,
      image: '',
      meme: '',
      vote: '',
    }
  },
  status: 'end',
  votes: {
    '': ['']
  }
}


