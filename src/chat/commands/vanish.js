function vanish(player, args) {

    checkAdmin(player);

    // Check if correct number of args
    switch(args.length) {
        case 0:
            break;
        case 1:
            player = getPlayerByName(args[0]);
            break;
        default:
            throw "invalid_usage";
    }

    if (player.getPotionEffect(14) !== 127) {
        player.addPotionEffect(14, 9999, 127, true);
        player.sendMessage(STYLE_SUCCESS+'You are now vanished');
        return;
    } else {
        player.addPotionEffect(14, 0, 127, true);
        player.sendMessage(STYLE_FAILURE+'You have now unvanished');
        return;
    }
}