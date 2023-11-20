function reload(player, args) {
    switch(args.length) {
        case 0:
            // Run command
            API.executeCommand(player.getWorld(), "noppes script reload");

            // Send message
            player.sendMessage(STYLE_SUCCESS+'Reload successful');
            return;
        default:
            throw "invalid_usage";
    }
}