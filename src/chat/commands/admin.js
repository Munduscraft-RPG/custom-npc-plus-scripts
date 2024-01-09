function admin(player, args) {

    // Disabled for testing
    // checkAdmin(player);

    // Get admin list
    var adminList = JSON.parse(API.getIWorld(0).getStoredData('adminList') || '[]');

    // First argument must be 'list' 'add' or 'remove'
    switch(args[0]) {
        case 'list':
            if(args.length !== 1) {throw "invalid_usage";}
            if(adminList.length === 0) { player.sendMessage(STYLE_FAILURE + "No admins found!"); return; }
            player.sendMessage(STYLE_SUCCESS+"Admin List:")
            for(var i = 0; i < adminList.length; i++) {
                player.sendMessage(STYLE_SUCCESS+(i+1)+". "+adminList[i]);
            }
            break;

        case 'add':
            if(args.length !== 2) {throw "invalid_usage";}
            adminAddName(args[1], adminList);
            player.sendMessage(STYLE_SUCCESS + 'Successfully added admin: ' + args[1]);
            break;

        case 'remove':
            if(args.length !== 2) {throw "invalid_usage";}
            adminRemoveName(args[1], adminList)
            player.sendMessage(STYLE_SUCCESS + 'Successfully removed admin: ' + args[1]);
            break;

        default:
            throw "invalid_usage";
    }
}
