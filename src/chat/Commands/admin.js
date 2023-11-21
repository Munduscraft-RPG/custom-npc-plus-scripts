function admin(player, args) {

    // Disabled for testing
    // checkAdmin(player);

    // Get admin list
    var adminList = JSON.parse(API.getIWorld(0).getStoredData('adminList') || '[]');

    // First argument must be 'list' 'add' or 'remove'
    switch(args[0]) {
        case 'list':

            // Check args length
            if(args.length !== 1) {throw "invalid_usage";}

            // Check if admin list is empty
            if(adminList.length > 0) {

                //Send admin list message
                player.sendMessage(STYLE_SUCCESS+"Admin List:")
                for(var i = 0; i < adminList.length; i++) {
                    player.sendMessage(STYLE_SUCCESS+(i+1)+". "+adminList[i]);
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

            // Update adminList
            if (adminList.indexOf(args[1]) === -1) {
                adminList.push(args[1]);
                API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
            }

            // Send message
            player.sendMessage(STYLE_SUCCESS + 'Successfully added admin: ' + args[1]);
            break;

        case 'remove':

            // Check args length
            if(args.length !== 2) {throw "invalid_usage";}

            // Update adminList
            var index = adminList.indexOf(args[1]);
            if (index > -1) {
                adminList.splice(index, 1);
                API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
            }

            // Send message
            player.sendMessage(STYLE_SUCCESS + 'Successfully removed admin: ' + args[1]);
            break;

        default:
            throw "invalid_usage";
    }
}
