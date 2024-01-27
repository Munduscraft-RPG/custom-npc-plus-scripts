function revivePlayer(npc){
    var player = getPlayerByName(npc.getName());
    var potionIds = JSON.parse(player.getStoredData('potionIds'));
    var potionAmps = JSON.parse(player.getStoredData('potionAmps'));
    var potionDurs = JSON.parse(player.getStoredData('potionDurs'));
    npc.setVisibleType(1);
    player.setPosition(npc.getPosition());
    player.sendMessage('Revived! ' + player.getName());
    for (var i = 0; i < potionIds.length; ++i){
        player.addPotionEffect(potionIds[i],potionDurs[i],potionAmps[i],true);
    }
    player.setStoredData('isKo',0);
    npc.setRespawnCycle(3);
    npc.hideKilledBody(1);
    npc.kill();
}