function stopTalkingTimer(npc) {

    // Check if there is no players nearby
    if (npc.getSurroundingEntities(16, 1).length > 0) { return; }

    // Get list of admins
    var adminList = JSON.parse(API.getIWorld(0).getStoredData("adminList") || '[]');

    // Send message to each admin
    for (var i = 0; i < adminList.length; i++) {
        var admin = API.getPlayer(adminList[i]);
        admin.sendMessage(STYLE_SUCCESS+admin.getName() + " is no longer talking to " + npc.getName());
    }

    // Set not talking
    npc.setStoredData('talking', 0);

    // Stop timer
    npc.getTimers().stop(67);

    // Reset NPC Settings to stored originals
    npc.setTitle(npc.getStoredData('talk-title'));
    npc.removeStoredData('talk-title');

    npc.setHome(npc.getStoredData('talk-homex'), npc.getStoredData('talk-homey'), npc.getStoredData('talk-homez'))
    npc.removeStoredData('talk-homex');
    npc.removeStoredData('talk-homey');
    npc.removeStoredData('talk-homez');

    npc.setMovingType(npc.getStoredData('talk-movingtype'));
    npc.removeStoredData('talk-movingtype');

    npc.setRotationType(npc.getStoredData('talk-rotationtype'))
    npc.removeStoredData('talk-rotationtype');

    npc.updateAI();
}