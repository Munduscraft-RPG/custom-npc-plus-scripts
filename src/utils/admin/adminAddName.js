function adminAddName(name, adminList) {
    var player = getPlayerByName(name);
    if(player) {
        adminAddPlayer(player, adminList);
    }
}