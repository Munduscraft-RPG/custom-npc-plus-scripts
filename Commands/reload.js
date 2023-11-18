function reload(player, args) {
    if(args.length != 0) { player.sendMessage(STYLE_FAILURE+'Invalid usage of ?reload command.'); return; }
    API.executeCommand(player.getWorld(), "noppes script reload");
    player.sendMessage(STYLE_SUCCESS+'Reload successful')
}