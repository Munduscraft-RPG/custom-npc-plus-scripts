function timerNpc(id, npc) {
    switch(id) {
        case 67:
            stopTalkingTimer(npc);
        case 100:
            revivePlayerTimer(npc);
            break;
        default:
            return;
    }
}