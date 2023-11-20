function getPlayerByName(name) {
    var player = API.getPlayer(name);
    if (!player) {throw "invalid_player";}
    return player;
}