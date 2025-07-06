function adminBroadcast(message) {
    var playerList = API.getAllServerPlayers();
    for(var i = 0; i<playerList.length; i++) {
        if(isAdmin(playerList[i])) {
            playerList[i].sendMessage('&e&lBroadcast: &r' + message);
        }
    }
}