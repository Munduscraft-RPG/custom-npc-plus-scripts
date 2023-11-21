function burn(player, args) {

    checkAdmin(player);

    var burningSeconds;
    switch(args.length) {
        case 1:
            if(!NUMERIC_REGEX.test(args[0])) { throw "invalid_usage"; }
            burningSeconds = args[0] / 20;
            player.extinguish();
            player.setBurning(burningSeconds);
            player.sendMessage(STYLE_SUCCESS+'You are now burning for '+args[0]+' seconds');
            return;
        case 2:
            if(!NUMERIC_REGEX.test(args[1])) { throw "invalid_usage"; }
            burningSeconds = args[1];
            var targetPlayer = getPlayerByName(args[0]);
            player.extinguish();
            targetPlayer.setBurning(burningSeconds);
            targetPlayer.sendMessage(STYLE_SUCCESS+args[0]+' is now burning for '+args[1]+' seconds');
            return;
        default:
            throw 'invalid_usage';
    }
}