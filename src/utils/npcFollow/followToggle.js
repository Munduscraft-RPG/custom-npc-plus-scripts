function followToggle(npc, player) {
    if(npc.hasStoredData('following') && npc.getStoredData('following')) {

        // Set not following
        npc.setStoredData('following', 0);

        npc.setMovingType(npc.getStoredData('follow-movingtype'));
        npc.removeStoredData('follow-movingtype');

        npc.setRotationType(npc.getStoredData('follow-rotationtype'))
        npc.removeStoredData('follow-rotationtype');

        var originalRole = npc.getStoredData('follow-role');
        npc.setRole(0);
        npc.setRole(originalRole);
        originalRole = npc.getRole()
        switch(originalRole.getType()) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                originalRole.setMarket(npc.getStoredData('follow-market'));
                npc.removeStoredData('follow-market');
                break;
            case 3:
                if(npc.hasStoredData('follow-getowner')) {
                    originalRole.setOwner(getPlayerByName(npc.getStoredData('follow-getowner')));

                    originalRole.setIsFollowing(npc.getStoredData('follow-isfollowing'));
                }
                originalRole.addDaysLeft(npc.getStoredData('follow-daysleft'));
                originalRole.setGuiDisabled(npc.getStoredData('follow-guidisabled'));
                originalRole.setInfiniteDays(npc.getStoredData('follow-infinitedays'));
                npc.removeStoredData('follow-daysleft');
                npc.removeStoredData('follow-guidisabled');
                npc.removeStoredData('follow-infinitedays');
                npc.removeStoredData('follow-getowner');
                npc.removeStoredData('follow-isfollowing');
                break;
            case 4:
                break;
            case 5:
                var transportName = npc.getStoredData('follow-transportname');
                var categories = API.getLocations().categories()
                for(var i=0; i<categories.length; i++) {
                    var transport = categories[i].getLocation(transportName)
                    if(transport) {
                        originalRole.setTransport(transport);
                        break;
                    }
                }
                npc.removeStoredData('follow-transportname');
                break;
        }
        npc.removeStoredData('follow-role');

        npc.updateAI();
    } else {

        // Set talking
        npc.setStoredData('following', 1);

        // Set NPC settings, storing originals
        npc.setStoredData('follow-movingtype', npc.getMovingType());
        npc.setMovingType(0);

        npc.setStoredData('follow-rotationtype', npc.getRotationType());
        npc.setRotationType(0);

        var originalRole = npc.getRole()
        var setRole;
        switch(originalRole.getType()) {
            case 0: // No role or companion
                setRole = 0;
                break;
            case 1: // Mailman
                setRole = 5;
                break;
            case 2: // Trader
                setRole = 1;
                var market = originalRole.getMarket()
                if(!market) {
                    var randomMarketName = (Math.random() + 1).toString(36).substring(7);
                    originalRole.setMarket(randomMarketName);
                    market = randomMarketName;
                }
                npc.setStoredData('follow-market', market);
                break;
            case 3: // Follower
                setRole = 2;
                if(originalRole.hasOwner()) {
                    var originalOwner = originalRole.getOwner().getName();
                    npc.setStoredData('follow-getowner', originalOwner);
                }
                npc.setStoredData('follow-daysleft', + originalRole.getDaysLeft());
                npc.setStoredData('follow-guidisabled', + originalRole.getGuiDisabled());
                npc.setStoredData('follow-infinitedays', + originalRole.getInfiniteDays());
                npc.setStoredData('follow-isfollowing', + originalRole.isFollowing());
                break;
            case 4: // Bank
                setRole = 3;
                break;
            case 5: // Transporter
                setRole = 4;
                var originalTransport = originalRole.getTransport()
                if(originalTransport) {
                    npc.setStoredData('follow-transportname', originalTransport.getName());
                }
                break;
        }
        npc.setStoredData('follow-role', setRole);

        npc.setRole(2); // set npc to follower
        var followerRole = npc.getRole();
        followerRole.setGuiDisabled(true);
        followerRole.setInfiniteDays(true);
        followerRole.setIsFollowing(true);
        followerRole.setOwner(player);

        npc.updateAI();
    }
}