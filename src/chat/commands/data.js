function data(player, args) {
    checkAdmin(player);

    var target;

    // Get looking at entity
    var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
    if(lookingAt.length === 0) { target = player } else { target = lookingAt[0] }

    var storedDatas = target.getStoredDataKeys();
    for(var i=0; i<storedDatas.length; i++ ) {
        player.sendMessage(storedDatas[i]+': '+target.getStoredData(storedDatas[i]));
    }
}