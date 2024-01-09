function broadcastMessage(message) {
    var playerList = API.getAllServerPlayers();
    for(var i = 0; i<playerList.length; i++) {
        playerList[i].sendMessage('&e&lBroadcast: &r'+message);
    }
}