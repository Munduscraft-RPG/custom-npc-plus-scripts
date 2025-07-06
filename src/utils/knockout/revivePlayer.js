function revivePlayer(player) {

    // Mark player as not KO
    player.setStoredData('isKo',0);

    player.setImmune(200);

    // Return player to previous position
    if(player.hasStoredData('KoX') && player.hasStoredData('KoY') && player.hasStoredData('KoZ')) {
        player.setPosition(player.getStoredData('KoX'), player.getStoredData('KoY'), player.getStoredData('KoZ'));
    } else {
        adminBroadcast(STYLE_FAILURE+player.getName()+' respawned but KoX, KoY, KoZ was not found.')
    }

    // Return players hunger
    if(player.hasStoredData('pastHunger')) {
        var hunger = player.getStoredData('pastHunger')
    } else {
        adminBroadcast(STYLE_FAILURE+player.getName()+'Player respawned but pastHunger was not found!')
        var hunger = 2;
    }
    if(hunger < 2) { hunger = 2; }
    player.setHunger(hunger);

    // Return players saturation
    if(player.hasStoredData('pastSaturation')) {
        var saturation = player.getStoredData('pastSaturation')
    } else {
        adminBroadcast(STYLE_FAILURE+player.getName()+'Player respawned but pastSaturation was not found!')
        var saturation = 2;
    }
    if(saturation < 2) { saturation = 2; }
    player.setSaturation(saturation);

    player.clearPotionEffects(); // Clear all potion effects

    if(player.hasStoredData('potionIds')) {
        // Return players potion effects
        var potionIds = JSON.parse(player.getStoredData('potionIds'));
        var potionAmps = JSON.parse(player.getStoredData('potionAmps'));
        var potionDurs = JSON.parse(player.getStoredData('potionDurs'));
        for (var i = 0; i < potionIds.length; ++i) {
            if (potionIds[i] === 7 || potionIds[i] === 19 || potionIds[i] === 20 || potionIds[i] === 23) {
                continue;
            }
            player.addPotionEffect(potionIds[i], potionDurs[i], potionAmps[i], true);
        }
    } else {
        adminBroadcast(STYLE_FAILURE+player.getName()+'Player respawned but potionIds was not found!')
    }

    player.sendMessage(STYLE_SUCCESS+'Revived!');
    adminBroadcast(STYLE_WARNING+player.getName()+' revived successfully.')

    // Find nearby NPCs
    var nearbyNpcs = player.getSurroundingEntities(10, 2);

    // Check if any corpses in nearby NPCs
    if (!nearbyNpcs || nearbyNpcs.length === 0) {
        adminBroadcast(STYLE_FAILURE+'Player respawned but corpse was not found!')
        return;
    }

    // Despawn any corpses in range
    for(var i=0; i<nearbyNpcs.length; i++) {
        if(nearbyNpcs[i].getName() === player.getName()) {
            var sleeper = nearbyNpcs[i];
            sleeper.despawn();
            return;
        }
    }
}