function adminAddPlayer(player, adminList) {
    if (adminList.indexOf(player.getName()) === -1) {
        adminList.push(player.getName());
        API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
    }
}