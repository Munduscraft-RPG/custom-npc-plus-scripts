function data(player, args) {
    checkAdmin(player);

    // Get looking at entity
    var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
    if(lookingAt.length === 0) { return; }

    var storedDatas = lookingAt[0].getStoredDataKeys();
    for(var i=0; i<storedDatas.length; i++ ) {
        player.sendMessage(storedDatas[i]+': '+lookingAt[0].getStoredData(storedDatas[i]));
    }
}