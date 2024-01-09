function talk(player, args) {
    if(args.length !== 0) { throw 'invalid_usage' }

    // Get looking at entity
    var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
    if(lookingAt.length === 0) { return; }

    // Check if looking at entity is npc
    if(lookingAt[0].getType() !== 2) { return; }
    var npc = lookingAt[0];

    // Check if npc is non-aggressive
    if(npc.getFaction().playerStatus(player) < 0) { return; }

    // Get list of admins
    var adminList = JSON.parse(API.getIWorld(0).getStoredData("adminList") || '[]');

    // Is NPC currently talking?
    talkToggle(npc, adminList, player);
}