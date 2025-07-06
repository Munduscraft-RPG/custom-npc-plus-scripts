function attackCustom(event){
    if (typeof event.getPlayer === 'function') {
        attackPlayer(event);
    } else {
        attackNpc(event);
    }
}