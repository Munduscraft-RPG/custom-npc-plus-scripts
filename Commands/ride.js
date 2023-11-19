function ride(player, args) {

    // Check Arguments
    if(args.length !== 0) {throw "invalid_usage";}

    // Get looking at entity
    var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true)
    if(lookingAt.length === 0) { return; }

    // Ride it
    player.setMount(lookingAt[0])
}