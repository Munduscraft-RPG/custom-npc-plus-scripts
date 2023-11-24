function fireball(player, args) {
    var x = player.getX();
    var y = player.getY();
    var z = player.getZ();
    var yaw = player.getRotation();
    var pitch = player.getPitch();

    var yawRad = yaw * (Math.PI / 180);
    var pitchRad = pitch * (Math.PI / 180);

    var distance = 2;

    var xOffset = -Math.sin(yawRad) * Math.cos(pitchRad) * distance;
    var yOffset = -Math.sin(pitchRad) * distance;
    var zOffset = Math.cos(yawRad) * Math.cos(pitchRad) * distance;

    var newX = x + xOffset;
    var newY = y + 0.8 + yOffset;
    var newZ = z + zOffset;
    player.sendMessage("New Coordinates: x = " + newX + ", y = " + newY + ", z = " + newZ)
    if(args[0]) {
        API.executeCommand(player.getWorld(), "summon Fireball " + newX + " " + newY + " " + newZ + " {ExplosionPower:"+args[0]+",direction:[0.0,0.0,0.0]}")
        return;
    }
    API.executeCommand(player.getWorld(), "summon Fireball " + newX + " " + newY + " " + newZ + " {ExplosionPower:1,direction:[0.0,0.0,0.0]}");
}