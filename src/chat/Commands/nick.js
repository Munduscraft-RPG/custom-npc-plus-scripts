function nick(player, args) {

    checkAdmin(player);

    switch(args.length){
        case 1:

            // Get nickname
            var newNick = args[0].replace(/_/g, ' ');

            // Store in player data
            player.setStoredData('nickname', newNick);

            // Send message
            player.sendMessage(STYLE_SUCCESS+'Nickname set to: '+ STYLE_RESET + newNick);

            return;
        case 2:

            // Get target player
            var targetPlayer = getPlayerByName(args[0]);

            // Get nickname
            var targetNick = args[1].replace(/_/g, ' ');

            // Store in player data
            targetPlayer.setStoredData('nickname', targetNick);

            // Send message
            player.sendMessage(STYLE_SUCCESS+'Nickname for '+STYLE_RESET+args[0]+STYLE_SUCCESS+' set to: '+STYLE_RESET+targetNick);

            return;
        default:
            throw "invalid_usage";
    }
}