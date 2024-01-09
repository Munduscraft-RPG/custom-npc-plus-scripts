function damagedCustom(event){
    function timerCustom(event) {
        var damage = event.getDamage();
        if (typeof event.getPlayer === 'function') {
            damagedPlayer(event);
        } else {
            damagedNpc(event);
        }
    }
}