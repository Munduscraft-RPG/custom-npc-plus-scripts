function hat(player, args) {

    checkAdmin(player);

    switch(args.length) {
        case 0:
            player.setArmor(3, player.getHeldItem());
            player.sendMessage(STYLE_SUCCESS+'You are now wearing a hat');
            return;
        case 1:
            var targetPlayer = getPlayerByName(args[0]);
            targetPlayer.setArmor(3, player.getHeldItem());
            player.sendMessage(STYLE_SUCCESS+args[0]+' is now wearing a hat');
            return;
        default:
            throw 'invalid_usage';
    }
}