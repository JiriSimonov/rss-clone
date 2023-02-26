export enum IoInput {
  chatMessageRequest = 'chat-message-request',
  createLobbyRequest = 'create-lobby-request',
  joinLobbyRequest = 'join-lobby-request',
  destroyLobbyRequest = 'destroy-lobby-request',
  lobbyListRequest = 'lobby-list-request',
  leaveLobbyRequest = 'leave-lobby-request',
  startGame = 'start-game-request',
  pickMeme = 'pick-meme-request',
  getVote = 'get-vote-request',
  forcedChangePhase = 'forced-change-phase-request',
}

export enum IoOutput {
  updateLobby = 'update-lobby',
  chatMessage = 'chat-message',
  createLobby = 'create-lobby',
  joinLobby = 'join-lobby',
  leaveLobby = 'leave-lobby',
  deleteLobby = 'delete-lobby',
  changePhase = 'change-phase',
}
