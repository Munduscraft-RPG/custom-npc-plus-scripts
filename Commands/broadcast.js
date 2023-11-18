function broadcast(player, args) {

    // Get all players
    playerList = API.getAllServerPlayers();

    // For each player
    for(var i = 0; i<playerList.length; i++) {

        // Send broadcast message
        playerList[i].sendMessage('&e&lBroadcast: &r'+args.join(' '));
    }

    return;
}