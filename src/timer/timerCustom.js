function timerCustom(event) {
    var id = event.getId();
    if (typeof event.getPlayer === 'function') {
        var player = event.getPlayer();
        timerPlayer(id, player);
    } else {
        var npc = event.getNpc();
        timerNpc(id, npc);
    }
}