function follow(player, args) {
    // Get looking at entity
    var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
    if(lookingAt.length === 0) { return; }

    if(args.length == 1) { var player = getPlayerByName(args[0]); }

    // Check if looking at entity is npc
    if(lookingAt[0].getType() !== 2) { return; }
    var npc = lookingAt[0];

    // Toggle if the NPC is following the player
    followToggle(npc, player)
}