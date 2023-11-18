function ping(player, args) {
    if (args.length === 0) {
        player.sendMessage(STYLE_SUCCESS+'Pong!');
    } else {
        player.sendMessage(STYLE_FAILURE+'Invalid usage of ?ping command.');
    }
}