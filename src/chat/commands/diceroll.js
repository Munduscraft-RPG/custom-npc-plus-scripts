function diceroll(player, args) {
    if(args.length !== 1) { throw 'invalid_usage' }
    if(args[0] <= 0 ) { throw 'invalid_usage' }
    player.sendMessage(STYLE_SUCCESS+"Rolled "+roll(args[0])+" on "+args[0]+ " sided die.")
}