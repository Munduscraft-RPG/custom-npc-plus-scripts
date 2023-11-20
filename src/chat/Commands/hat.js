function hat(player, args) {
    switch(args.length) {
        case 0:
            player.setArmor(3, player.getHeldItem());
            return;
        case 1:
            var targetPlayer = getPlayerByName(args[0]);
            targetPlayer.setArmor(3, player.getHeldItem());
            return;
        default:
            throw 'invalid_usage';
    }
}