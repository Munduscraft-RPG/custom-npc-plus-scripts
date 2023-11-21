function checkAdmin(player) {
    if(isAdmin(player)) { return; }
    throw 'permission_denied';
}