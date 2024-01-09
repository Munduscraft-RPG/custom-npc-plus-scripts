function broadcast(player, args) {
    checkAdmin(player);
    broadcastMessage(args.join(" "));
}