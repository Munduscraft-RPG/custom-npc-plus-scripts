function damagedPlayer(event) {
    var player = event.getPlayer();
    var damage = event.getDamage();
    if(player.getHealth() - damage > 0) { return; }
    event.setCancelled(true);
    koPlayer(player);
}