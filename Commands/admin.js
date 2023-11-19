function admin(player, args) {

    // First argument should be 'list' 'add' or 'remove'
    switch(args[0]) {
        case 'list':

            // Check args length
            if(args.length !== 1) {player.sendMessage(STYLE_RESET + 'Invalid usage of ?nick command.'); return; }

            // Get admin list
            var adminListStr = API.getIWorld(0).getStoredData('adminList');
            var adminList = JSON.parse(adminListStr || '[]');

            // Check if admin list is empty
            if(adminList.length > 0) {
                //Send admin list
                player.sendMessage(STYLE_SUCCESS+"Admin List:")
                for(var i = 0; i < adminList.length; i++) {
                    player.sendMessage(STYLE_SUCCESS+eval(i+1)+". "+adminList[i]);
                }

            } else {
                // No admins found
                player.sendMessage(STYLE_FAILURE+"No admins found!")
            }
            break;

        case 'add':

            // Check args length
            if(args.length !== 2) {player.sendMessage(STYLE_RESET + 'Invalid usage of ?nick command.'); return; }

            // Get target player
            var targetPlayer = API.getPlayer(args[1]);
            if (targetPlayer === null) { player.sendMessage(STYLE_FAILURE + 'Target player not found.'); return; }

            // Update admin list
            targetPlayer.setStoredData("isAdmin", 1);
            var adminListStr = API.getIWorld(0).getStoredData('adminList');
            var adminList = JSON.parse(adminListStr || '[]');
            if (adminList.indexOf(args[1]) === -1) {
                adminList.push(args[1]);
                API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
            }
            player.sendMessage(STYLE_SUCCESS + 'Successfully added admin: ' + args[1]);
            break;

        case 'remove':

            // Check args length
            if(args.length !== 2) {player.sendMessage(STYLE_RESET + 'Invalid usage of ?nick command.'); return; }

            // Get target player
            var targetPlayer = API.getPlayer(args[1]);
            if (targetPlayer === null) { player.sendMessage(STYLE_FAILURE + 'Target player not found.'); return; }

            // Set player data
            targetPlayer.setStoredData("isAdmin", 0);

            // Update adminList
            var adminListStr = API.getIWorld(0).getStoredData('adminList');
            var adminList = JSON.parse(adminListStr || '[]');
            var index = adminList.indexOf(args[1]);
            if (index > -1) {
                adminList.splice(index, 1);
                API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
            }
            player.sendMessage(STYLE_SUCCESS + 'Successfully removed admin: ' + args[1]);
            break;

        default:
            player.sendMessage(STYLE_RESET + 'Invalid usage of ?nick command.');
            break;
    }
}
