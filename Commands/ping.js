function ping(player, args) {
    if (args.length === 0) {
        player.sendMessage(STYLE_SUCCESS+'Pong!');
    } else {throw "invalid_usage";}
}