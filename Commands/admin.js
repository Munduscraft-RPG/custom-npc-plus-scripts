function admin(player, args) {

    // First argument should be 'list' 'add' or 'remove'
    switch(args[0]) {
        case 'list':

            // Check args length
            if(args.length !== 1) {throw "invalid_usage";}

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
            if(args.length !== 2) {throw "invalid_usage";}

            // Check player is valid
            getPlayerByName(args[1]);

            // Update admin list
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
            if(args.length !== 2) {throw "invalid_usage";}

            // Check player is valid
            getPlayerByName(args[1]);

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
            throw "invalid_usage";
    }
}
