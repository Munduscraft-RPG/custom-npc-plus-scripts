function ride(player, args) {

    var lookingAt;

    switch(args.length) {
        case 0:

            // Get looking at entity
            lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
            if(lookingAt.length === 0) { return; }

            // Ride it
            player.setMount(lookingAt[0]);
            return;
        case 1:

            // Get target player
            var targetPlayer = getPlayerByName(args[0]);

            // Get looking at entity
            lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
            if(lookingAt.length === 0) { return; }

            // Ride it
            targetPlayer.setMount(lookingAt[0]);
            return;

        default:
            throw "invalid_usage";
    }
}