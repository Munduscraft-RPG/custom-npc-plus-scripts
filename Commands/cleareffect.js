function cleareffect(player,args){
    switch(args.length){
        case 0:
            player.clearPotionEffects();
            player.sendMessage(STYLE_SUCCESS+'Potion effects cleared ');
            return;
        case 1:
            var targetPlayer=API.getPlayer(args[0]);
            if (targetPlayer === null) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
            player.sendMessage(STYLE_SUCCESS+'Potion effects cleared for target ' + args[0]);
            targetPlayer.clearPotionEffects();
            return;
        default:
            player.sendMessage(STYLE_FAILURE+'No effects Removed');       
            break;
    }
}