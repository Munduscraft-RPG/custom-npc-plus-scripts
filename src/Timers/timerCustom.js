

function timerCustom(event){ 
    var npc = event.getNpc();
    var id = event.getId();
    switch(id){
        case 100:
            revivePlayer(npc);
            break;
        default:
            return;
    }
    
}