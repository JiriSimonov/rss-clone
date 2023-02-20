export enum IoInput {
  chatMessageRequest = 'chat-message-request',
  createLobbyRequest = 'create-lobby-request',
  joinLobbyRequest = 'join-lobby-request',
  destroyLobbyRequest = 'destroy-lobby-request',
  lobbyDataRequest = 'lobby-data-request',
  lobbyListRequest = 'lobby-list-request',
  leaveLobbyRequest = 'leave-lobby-request',
  randomMemesRequest = 'random-memes-request',
  startGame = 'start-game-request',
  pickMeme = 'pick-meme-request',
  getVote = 'get-vote-request',
}

export enum IoOutput {
  chatMessage = 'chat-message',
  createLobby = 'create-lobby',
  joinLobby = 'join-lobby',
  leaveLobby = 'leave-lobby',
  deleteLobby = 'delete-lobby',
  changePhase = 'change-phase',
}
