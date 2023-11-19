function vanish(player, args) {

    // Check if correct number of args
    switch(args.length) {
        case 0:
            if (player.getPotionEffect(14) !== 127) {
                player.addPotionEffect(14, 9999, 127, true);
                player.sendMessage(STYLE_SUCCESS+'You are now vanished');
                return;
            } else {
                player.addPotionEffect(14, 0, 127, true);
                player.sendMessage(STYLE_FAILURE+'You have now unvanished');
                return;
            }
        case 1:
            var targetPlayer = API.getPlayer(args[0]);
            if (!targetPlayer) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
            if (targetPlayer.getPotionEffect(14) !== 127) {
                targetPlayer.addPotionEffect(14, 9999, 127, true);
                targetPlayer.sendMessage(STYLE_SUCCESS+args[0]+' has now vanished');
                return;
            } else {
                targetPlayer.addPotionEffect(14, 0, 127, true);
                targetPlayer.sendMessage(STYLE_FAILURE+args[0]' has now unvanished');
                return;
            }
        default:
            player.sendMessage(STYLE_FAILURE+'Invalid usage of ?v command.');
            break;
    }
}