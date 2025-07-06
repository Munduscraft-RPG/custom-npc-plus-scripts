function createSleeper(player) {
    var corpse = API.spawnNPC(API.getIWorld(player.getDimension()),player.getPosition());
    corpse.setNaturallyDespawns(false)
    corpse.setSkinUrl('https://mineskin.eu/skin/'+player.getName());
    corpse.setName(player.getName());
    corpse.setShowName(1);
    corpse.setAnimation(2);
    corpse.setLivingAnimation(false);
    corpse.hideKilledBody(1);
    corpse.setOnFoundEnemy(3);
    corpse.setAggroRange(0);
    corpse.setReturnToHome(false);
    corpse.setDrowningType(0);
    corpse.setSpeed(0);
    corpse.setJob(8);
    corpse.setArrowResistance(100);
    corpse.setExplosionResistance(100);
    corpse.setKnockbackResistance(100);
    corpse.setMeleeResistance(100);
    corpse.addPotionEffect(12, 1000000, 1, true);
    corpse.addPotionEffect(11, 1000000, 1, true);
    corpse.addPotionEffect(2, 1000000, 127, true);
    corpse.addPotionEffect(13, 1000000, 1, true);
    corpse.setImmune(1000000);
    var factions = API.getFactions().list();
    var factionId = 0;
    var factionName = '';
    for(var i=0; i<factions.size();++i){
        if(factions[i].getName()=='corpse'){
            factionId = factions[i].getId();
            factionName = factions[i].getName();
        }
    }
    if(factionName == 'corpse'){
        corpse.setFaction(factionId);
    }
    else{
        var faction = API.getFactions().create('corpse', 2);
        corpse.setFaction(faction.getId());
        faction.setAttackedByMobs(false);
        faction.setIsHidden(true);
        faction.setNeutralPoints(0);
        faction.setFriendlyPoints(1);
        faction.setDefaultPoints(2);
        faction.setColor(0);
        faction.save();
    }
    corpse.setDefendFaction(false);
    corpse.updateAI();
    corpse.updateClient();

}