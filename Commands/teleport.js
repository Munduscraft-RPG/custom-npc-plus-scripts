function teleport(player, args) {
    switch(args.length) {

        // One Argument: Teleport self to player
        case 1:
            var targetPlayer = API.getPlayer(args[0]);
            if (targetPlayer === null) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
            player.sendMessage(STYLE_SUCCESS+'Teleporting to ' + args[0]);
            player.setPosition(targetPlayer.getPosition(), targetPlayer.getDimension());
            break;

        // Two Arguments: Teleport victim to target
        case 2:
            var victimPlayer = API.getPlayer(args[0]);
            if (victimPlayer === null) { player.sendMessage(STYLE_FAILURE+'Victim player not found.'); return; }
            var targetPlayer = API.getPlayer(args[1]);
            if (targetPlayer === null) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
            player.sendMessage(STYLE_SUCCESS+'Teleporting '+args[0]+' to '+args[1]);
            victimPlayer.setPosition(targetPlayer.getPosition(), targetPlayer.getDimension());
            break;

        // Three arguments: Teleport self to x y z coordinates
        case 3:
            if(!NUMERIC_REGEX.test(args[0]) || !NUMERIC_REGEX.test(args[1]) || !NUMERIC_REGEX.test(args[2])) { player.sendMessage(STYLE_FAILURE+'Invalid usage of ?teleport command.'); return; }
            player.sendMessage(STYLE_SUCCESS+'Teleporting to ('+args[0]+','+args[1]+','+args[2]+') in dimension '+player.getDimension());
            player.setPosition(args[0], args[1], args[2], player.getDimension());
            break;

        // Four arguments: Teleport self to x y z and dimension id OR teleport victim to x y z
        case 4:
            if(NUMERIC_REGEX.test(args[0]) && NUMERIC_REGEX.test(args[1]) && NUMERIC_REGEX.test(args[2]) && NUMERIC_REGEX.test(args[3])) {
                try { API.getIWorld(args[3]) } catch (e) { player.sendMessage(STYLE_FAILURE+'Target dimension not found.'); return; }
                player.sendMessage(STYLE_SUCCESS+'Teleporting to (' + args[0] + ',' + args[1] + ',' + args[2] + ') in dimension ' + args[3]);
                player.setPosition(args[0], args[1], args[2], args[3])
                break;
            } else if ( !NUMERIC_REGEX.test(args[0]) && NUMERIC_REGEX.test(args[1]) && NUMERIC_REGEX.test(args[2]) && NUMERIC_REGEX.test(args[3]) ) {
                var victimPlayer = API.getPlayer(args[0]);
                if (victimPlayer === null) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
                player.sendMessage(STYLE_SUCCESS+'Teleporting '+args[0]+STYLE_SUCCESS+' to (' + args[1] + ',' + args[2] + ',' + args[3] + ') in dimension ' + player.getDimension());
                victimPlayer.setPosition(args[1], args[2], args[3]);
                break;
            } else {
                player.sendMessage(STYLE_FAILURE+'Invalid usage of ?teleport command.');
                break;
            }

        // Five Arguments: Teleport victim to x y z and dimension id
        case 5:
            try { API.getIWorld(args[4]) } catch (e) { player.sendMessage(STYLE_FAILURE+'Target dimension not found.'); return; }
            var victimPlayer = API.getPlayer(args[0]);
            if (victimPlayer === null) { player.sendMessage(STYLE_FAILURE+'Target player not found.'); return; }
            player.sendMessage(STYLE_SUCCESS+'Teleporting '+args[0]+' to (' + args[1] + ',' + args[2] + ',' + args[3] + ') in dimension ' + args[4]);
            victimPlayer.setPosition(args[1], args[2], args[3], args[4]);
            break;

        // Other argument count: Invalid
        default:
            player.sendMessage(STYLE_FAILURE+'Invalid usage of ?teleport command.');
    }
    return;
}