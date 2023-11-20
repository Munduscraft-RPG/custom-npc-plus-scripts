function ping(player, args) {
    switch(args.length) {
        case 0:
            // Send message
            player.sendMessage(STYLE_SUCCESS+'Pong!');
            return;
        default:
            throw "invalid_usage";
    }
}