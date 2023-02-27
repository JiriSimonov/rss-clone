export enum GameStatus {
  Prepare = 'prepare',
  Situation = 'situation',
  ChooseSituation = 'choose-situation',
  Vote = 'vote',
  Vote_results = 'vote-results',
  End = 'end',
}

type ChoiceList = {
  [choiceOption: string]: string[];
}

export interface Player {
  username: string;
  score: number;
  image: string;
  meme: string;
  vote: string;
}

type SituationChoice = {
  [situationOpion: string]: {
    username: string;
    image: string;
  }[];
}

export interface GameCurrentData {
  mode: string;
  phase: string;
  currentRound: number;
  situation: string;
  situationOptions: string[];
  situations: SituationChoice;
  players: Player[];
  changePhaseDate: number;
  memes: ChoiceList;
  votes: ChoiceList;
}
