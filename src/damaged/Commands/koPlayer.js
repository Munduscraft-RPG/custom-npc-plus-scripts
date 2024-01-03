function koPlayer(player){
    var koX = API.getIWorld(0).getStoredData('spawnX');
    var koY = API.getIWorld(0).getStoredData('spawnY');
    var koZ = API.getIWorld(0).getStoredData('spawnZ');
    var position = player.getPosition();
    var koTime = koTimerSet();
    player.setStoredData('koCoords',[position.x,position.y,position.z]); //Save players knockout location in the players data
    player.setStoredData('pastHunger',player.getHunger());
    player.setStoredData('pastSaturation', player.getSaturation());
    player.setPosition(koX, koY, koZ, 0); //Teleports player to the ko/spawnroom
    player.sendMessage(STYLE_FAILURE+'you have been knocked out');
    player.clearPotionEffects();
    player.start(id=100,ticks=koTime, repeat=false); 
}