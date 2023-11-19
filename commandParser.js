function commandParser(player, message) {
    var parts = message.substring(1).split(' ');
    var command = parts[0];
    var args = parts.slice(1);

    switch (command) {
        case 'b':
        case 'broadcast':
            broadcast(player, args);
            break;
        case 'ce':
        case 'cleareffect':
            cleareffect(player, args);
            break;
        case 'n':
        case 'nick':
            nick(player, args);
            break;
        case 'p':
        case 'ping':
            ping(player, args);
            break;
        case 'r':
        case 'reload':
            reload(player, args);
            break;
        case 'ride':
            ride(player, args);
            break;
        case 'tp':
        case 'teleport':
            teleport(player, args);
            break;
        case 'v':
        case 'vanish':
            vanish(player, args);
            break;
        default:
            player.sendMessage(STYLE_FAILURE + 'Unknown command');
            break;
    }
    return;
}