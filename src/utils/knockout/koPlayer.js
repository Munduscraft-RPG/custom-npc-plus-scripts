function koPlayer(player, damage){

    // Dont KO players who are already KO
    if (player.hasStoredData('isKo')&&(player.getStoredData('isKo')==1)){return};

    // Mark player as KO
    player.setStoredData('isKo',1);

    // Get KO time
    kotime = 600 * damage

    if(kotime > 6000) {
        kotime = 6000
    }

    // Start a player timer
    player.getTimers().start(9, kotime, false);

    // Get spawn position
    var spawnX = API.getIWorld(0).getStoredData('spawnX');
    var spawnY = API.getIWorld(0).getStoredData('spawnY');
    var spawnZ = API.getIWorld(0).getStoredData('spawnZ');

    // Store KO position
    player.setStoredData('KoX', player.getX())
    player.setStoredData('KoY', player.getY())
    player.setStoredData('KoZ', player.getZ())

    // Store player hunger
    player.setStoredData('pastHunger',player.getHunger());

    // Store player saturation
    player.setStoredData('pastSaturation', player.getSaturation()); //Save players saturation in the players data


    // Get potion effects from the player entity
    var potionEffects = player.getMCEntity().func_70651_bq();

    //Save potion effects to player data
    var potionIterator = potionEffects.iterator();
    var potionIds = [];
    var potionAmps = [];
    var potionDurs = [];
    while(potionIterator.hasNext()) {
        var potionEffect = potionIterator.next();
        potionIds.push(potionEffect.func_76456_a());
        potionAmps.push(potionEffect.func_76458_c());
        potionDurs.push(potionEffect.func_76459_b() / 20);
    }
    player.setStoredData('potionIds', JSON.stringify(potionIds));
    player.setStoredData('potionAmps', JSON.stringify(potionAmps));
    player.setStoredData('potionDurs', JSON.stringify(potionDurs));

    // Create the players sleeper
    createSleeper(player);

    // Send player to KO room and fix stats
    player.setPosition(spawnX, spawnY, spawnZ, 0); //Teleports player to the ko/spawnroom
    player.sendMessage(STYLE_FAILURE+'you have been knocked out for '+kotime/20+' seconds'); // Let the player know how long their knocked
    adminBroadcast(STYLE_WARNING+player.getName()+' has been KO for '+kotime/20+' seconds');

    player.extinguish(); // Stop burning
    player.clearPotionEffects(); // Clear all potion effects
    player.setHealth(20); //  Fill up health
    player.setHunger(20); // Fill up hunger
    player.addPotionEffect(23, 1000000, 255, true); // Give saturation to prevent hunger loss while KO
} 
