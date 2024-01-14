function damagedCustom(event){
    var damage = event.getDamage();
    if (typeof event.getPlayer === 'function') {
        damagedPlayer(event);
    } else {
        damagedNpc(event);
    }
}