export enum EventName {
  chatGlobalMessage = 'globalChatMessage',
  messageToServer = 'messageToServer',
  joinRoom = 'joinRoom',
  leaveRoom = 'leaveRoom',
  getRoomList = 'getRoomList',
  createLobbyRequest = 'createLobbyRequest',
  isUuidUniqueRequest = 'isUuidUniqueRequest',
  joinLobbyRequest = 'joinLobbyRequest',
  destroyLobbyRequest = 'destroyLobbyRequest',
  getLobbyData = 'getLobbyData',
  getLobbyList = 'getLobbyList',
  lobbyCreated = 'lobbyCreated',
  isPasswordCorrectRequest = 'isPasswordCorrectRequest',
  joinGlobalChat = "joinGlobalChat"
}