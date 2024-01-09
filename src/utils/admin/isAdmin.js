function isAdmin(player) {
    var adminList = JSON.parse(API.getIWorld(0).getStoredData("adminList") || '[]');
    if(adminList.indexOf(player.getName()) !== -1) { return true; }
    return false;
}