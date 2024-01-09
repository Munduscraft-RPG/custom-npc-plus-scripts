function koPlayer(player){
    var koX = API.getIWorld(0).getStoredData('spawnX');
    var koY = API.getIWorld(0).getStoredData('spawnY');
    var koZ = API.getIWorld(0).getStoredData('spawnZ');
    var potionEffects = player.getMCEntity().func_70651_bq();
    var iterator = potionEffects.iterator();
    var potionIds = [];
    var potionAmps = [];
    var potionDurs = [];
    var koTime = 100; //sets koTimer start value
    var corpse = API.spawnNPC(API.getIWorld(player.getDimension()),player.getPosition());
    //Saves players current potion effects
    while (iterator.hasNext()) {
        var potionEffect = iterator.next();
        potionIds.push(potionEffect.func_76456_a());
        potionAmps.push(potionEffect.func_76458_c());
        potionDurs.push(potionEffect.func_76459_b());
    }

    player.setStoredData('potionIds', JSON.stringify(potionIds));
    player.setStoredData('potionAmps', JSON.stringify(potionAmps));
    player.setStoredData('potionDurs', JSON.stringify(potionDurs));

    player.setStoredData('pastHunger',player.getHunger()); //Save players hunger when knocked out in the players data
    player.setStoredData('pastSaturation', player.getSaturation()); //Save players saturation in the players data
    
    corpse.setName(player.getName());
    corpse.setAnimation(2);
    player.setPosition(koX, koY, koZ, 0); //Teleports player to the ko/spawnroom
    player.sendMessage(STYLE_FAILURE + 'you have been knocked out');
    player.clearPotionEffects();
    corpse.getTimers().start(100, koTime, false); //Starts knockout timer
    player.sendMessage(corpse.getTimers().has(100));
} 
