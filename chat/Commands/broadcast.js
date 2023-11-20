function broadcast(player, args) {
    switch(args.length) {
        case 1:
            // Get all players
            var playerList = API.getAllServerPlayers();

            // For each player
            for(var i = 0; i<playerList.length; i++) {
                // Send broadcast message
                playerList[i].sendMessage('&e&lBroadcast: &r'+args.join(' '));
            }

            return;

        default:
            throw "invalid_usage";
    }
}