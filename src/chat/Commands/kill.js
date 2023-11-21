function kill(player, args) {

    checkAdmin(player);

    switch(args.length) {
        case 0:

            // kill player
            player.setHealth(0);
            return;

        case 1:

            // kill player by name
            getPlayerByName(args[0]).setHealth(0);
            return;

        default:
            throw "invalid_usage";
    }
}