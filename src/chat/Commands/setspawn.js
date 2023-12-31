function setspawn(player, args){
    if (args.length > 0){throw 'invalid_usage'}
    checkAdmin(player);
    var position = player.getPosition();
    var coords = [position.x, position.y, position.z];
    API.getIWorld(0).setSpawnLocation(coords[0],coords[1],coords[2]);
    API.getIWorld(0).setStoredData('spawnX',coords[0]);
    API.getIWorld(0).setStoredData('spawnY',coords[1]);
    API.getIWorld(0).setStoredData('spawnZ',coords[2]);
    player.sendMessage(STYLE_SUCCESS+'Spawn point set');
}