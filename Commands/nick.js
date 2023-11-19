function nick(player, args) {
    if (args.length === 1) {
        var newNick = args[0].replace(/_/g, ' ');
        player.setStoredData('nickname', newNick);
        player.sendMessage(STYLE_SUCCESS+'Nickname set to: '+ STYLE_RESET + newNick);
        return;
    } else if (args.length === 2) {
        var targetPlayer = getPlayerByName(args[0]);
        var targetNick = args[1].replace(/_/g, ' ');
        targetPlayer.setStoredData('nickname', targetNick);
        player.sendMessage(STYLE_SUCCESS+'Nickname for '+STYLE_RESET+args[0]+STYLE_SUCCESS+' set to: '+STYLE_RESET+targetNick);
        return;
    } else {throw "invalid_usage";}
}