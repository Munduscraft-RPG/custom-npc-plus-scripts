function chat(event) {
    event.setCancelled(true);
    chatCustom(event);
}

function damaged(event){
    var player = event.getPlayer();
    var damage = event.getDamage();
    var health = player.getHealth();
    if (health - damage > 0){return;}
    event.setCancelled(true);
    damagedCustom(event);
}