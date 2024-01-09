function talkToggle(npc, adminList, player) {
    if(npc.hasStoredData('talking') && npc.getStoredData('talking')) {

        // Send message to each admin
        for(var i=0;i<adminList.length;i++) {
            var admin = API.getPlayer(adminList[i]);
            admin.sendMessage(STYLE_SUCCESS+player.getName()+" is no longer talking to "+npc.getName());
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
    } else {

        // Send message to each admin
        for(var i=0;i<adminList.length;i++) {
            var admin = API.getPlayer(adminList[i]);
            admin.sendMessage(STYLE_SUCCESS+player.getName()+" is talking to "+npc.getName());
        }

        // Set talking
        npc.setStoredData('talking', 1);

        // Start timer for ensuring player is in proximity
        npc.getTimers().start(67, 60, true);

        // Set NPC settings, storing originals
        npc.setStoredData('talk-title', npc.getTitle());
        npc.setTitle('Talking..');

        npc.setStoredData('talk-homex', npc.getHomeX());
        npc.setHomeX(npc.getX());

        npc.setStoredData('talk-homey', npc.getHomeY());
        npc.setHomeY(npc.getY());

        npc.setStoredData('talk-homez', npc.getHomeZ());
        npc.setHomeZ(npc.getZ());

        npc.setStoredData('talk-movingtype', npc.getMovingType());
        npc.setMovingType(0);

        npc.setStoredData('talk-rotationtype', npc.getRotationType());
        npc.setRotationType(2);

        npc.updateAI();
    }
}