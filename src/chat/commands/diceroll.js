function diceroll(player, args) {
    if(args.length !== 1) { throw 'invalid_usage' }
    if(args[0] <= 0 ) { throw 'invalid_usage' }
    var result = roll(args[0])
    player.sendMessage(STYLE_SUCCESS+"Rolled "+result+" on "+args[0]+ " sided die.")
}