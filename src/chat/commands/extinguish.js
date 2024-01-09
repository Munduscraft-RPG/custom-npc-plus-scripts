function extinguish(player, args) {

    checkAdmin(player);

    switch(args.length) {
        case 0:
            player.extinguish();
            player.sendMessage(STYLE_SUCCESS+'You are now extinguished');
            return;
        case 1:
            var targetPlayer = getPlayer(args[0]);
            targetPlayer.extinguish();
            player.sendMessage(STYLE_SUCCESS+args[0]+' is now extinguished');
            return;
        default:
            throw 'invalid_usage';
    }
}