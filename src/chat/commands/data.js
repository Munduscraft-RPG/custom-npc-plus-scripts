function data(player, args) {
    checkAdmin(player);

    switch(args.length) {
        case 0:
            var target;

            // Get looking at entity
            var lookingAt = player.getLookingAtEntities(3, 0, 0.5, true, true, true);
            if(lookingAt.length === 0) { target = player } else { target = lookingAt[0] }

            var storedDatas = target.getStoredDataKeys();
            for(var i=0; i<storedDatas.length; i++ ) {
                player.sendMessage(storedDatas[i]+': '+target.getStoredData(storedDatas[i]));
            }
            return;
        case 1:
            if(args[0] == 'clear') {
                player.clearStoredData();
                return;
            }

            var target = getPlayerByName(args[0]);
            var storedDatas = target.getStoredDataKeys();
            for(var i=0; i<storedDatas.length; i++ ) {
                player.sendMessage(storedDatas[i]+': '+target.getStoredData(storedDatas[i]));
            }
            return;
        default:
            switch(args[0]) {
                case 'get':
                    if(args.length !== 2){throw "invalid_usage";}
                    var target = getPlayerByName(args[1]);
                    var storedDatas = target.getStoredDataKeys();
                    for(var i=0; i<storedDatas.length; i++ ) {
                        player.sendMessage(storedDatas[i]+': '+target.getStoredData(storedDatas[i]));
                    }
                    return;
                case 'set':
                    if(args.length !== 4){throw "invalid_usage";}
                    var target = getPlayerByName(args[1]);
                    var key = args[2];
                    var value = args[3];
                    target.setStoredData(key, value);
                    return;
                case 'clear':
                    if(args.length !== 2){throw "invalid_usage";}
                    var target = getPlayerByName(args[1]);
                    target.clearStoredData();
                    return;

                default:
                    throw "invalid_usage";
            }
    }
}