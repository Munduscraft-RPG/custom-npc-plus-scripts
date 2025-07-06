function data(player, args) {
    checkAdmin(player);

    if(args.length < 2) {
        throw "invalid_usage";
    }

    var subcommand = args[0];
    var target = getPlayerByName(args[1]);

    switch(subcommand) {
        case 'get':
            if(args.length !== 2) {
                throw "invalid_usage";
            }
            var storedDatas = target.getStoredDataKeys();
            if(storedDatas.length === 0) {
                player.sendMessage(STYLE_SUCCESS+'No stored data found for '+args[1]);
            } else {
                player.sendMessage(STYLE_SUCCESS+'Stored data for '+args[1])
                for(var i = 0; i < storedDatas.length; i++) {
                    var key = storedDatas[i];
                    player.sendMessage(key + STYLE_RESET + STYLE_GRAY + ' \u00BB ' + STYLE_RESET + target.getStoredData(key));
                }
            }
            return;

        case 'set':
            if(args.length !== 4) {
                throw "invalid_usage";
            }
            var key = args[2];
            var value = args[3];
            target.setStoredData(key, value);
            player.sendMessage(STYLE_SUCCESS + 'Set ' + STYLE_RESET + key + STYLE_SUCCESS + ' to ' + STYLE_RESET + value + STYLE_SUCCESS +' for ' + args[1]);
            return;

        case 'remove':
            if(args.length !== 3) {
                throw "invalid_usage";
            }
            var key = args[2];
            target.removeStoredData(key);
            player.sendMessage(STYLE_SUCCESS + 'Removed key ' + STYLE_RESET + key + STYLE_RESET + STYLE_SUCCESS + ' from ' + args[1]);
            return;

        case 'clear':
            if(args.length !== 2) {
                throw "invalid_usage";
            }
            target.clearStoredData();
            player.sendMessage(STYLE_SUCCESS + 'Cleared all stored data for ' + args[1]);
            return;

        default:
            throw "invalid_usage";
    }
}
