function cleareffect(player,args){
    switch(args.length){
        case 0:
            player.clearPotionEffects();
            player.sendMessage(STYLE_SUCCESS+'Potion effects cleared');
            return;
        case 1:
            var targetPlayer = getPlayerByName(args[0]);
            player.sendMessage(STYLE_SUCCESS+'Potion effects cleared for ' + args[0]);
            targetPlayer.clearPotionEffects();
            return;
        default:
            throw "invalid_usage";
    }
}