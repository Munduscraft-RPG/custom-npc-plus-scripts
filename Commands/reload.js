function reload(player, args) {
    if(args.length != 0) {throw "invalid_usage";}
    API.executeCommand(player.getWorld(), "noppes script reload");
    player.sendMessage(STYLE_SUCCESS+'Reload successful')
}