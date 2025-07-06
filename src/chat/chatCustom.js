var ALL_STYLE_RESET_REGEX = /&r/g;
var YELL_REGEX = /^(?:(?:&[a-z])|[^a-z\n])*!.*$/;
var WHISPER_REGEX = /^[^A-Z!]*\.{3}$/;
var NUMERIC_REGEX = /^-?\d+$/;
var EMPHASIS_REGEX = /\/(.*?)\//g;

// Speech Ranges
var TALK_RANGE = 16;
var YELL_RANGE = 40;
var WHISPER_RANGE = 3;

function chatCustom(event) {

    //Get message string
    var message = event.getMessage();

    //Get player object
    var player = event.getPlayer();

    //Parse q commands separate from chat
    if (message.startsWith('?')) {
        commandParser(player, message);
        return;
    }

    // Add emphasis support
    message = message.replace(EMPHASIS_REGEX, STYLE_EMPHASIS+'$1'+STYLE_RESET);

    // Define range variable
    var range;

    // Format chat and set range if yelling or whispering
    if(YELL_REGEX.test(message)) {
        message = STYLE_YELL + message;
        message = message.replace(ALL_STYLE_RESET_REGEX, STYLE_YELL);
        range = YELL_RANGE;
    } else if(WHISPER_REGEX.test(message)) {
        message= STYLE_WHISPER + message;
        message = message.replace(ALL_STYLE_RESET_REGEX, STYLE_WHISPER)
        range = WHISPER_RANGE;
    } else {
        range = TALK_RANGE;
    }

    // Get player name
    var name = player.getDisplayName();
    if(player.hasStoredData('nickname')) {
        name = player.getStoredData('nickname');
    }

    // If the player is drunk, use drunk text distortion
    if(player.hasStoredData('isTipsy') && player.getStoredData('isTipsy') === 1) {
        message = speechModifier('tipsy', message);
    }

    // Format message into a full chat message
    message = name + STYLE_RESET + STYLE_GRAY + ' \u00BB ' + STYLE_RESET + message;

    var messages = wrapStyledMessage(message, 320)

    // Send message to self
    for (var i = 0; i < messages.length; i++) {
        player.sendMessage(messages[i]);
    }

    // Get list of admins
    var adminList = JSON.parse(API.getIWorld(0).getStoredData("adminList") || '[]');

    // Send message to each admin
    for(var j=0;j<adminList.length;j++) {
        var admin = API.getPlayer(adminList[j]);
        if(!admin || admin === player ) { continue; }
        for (var i = 0; i < messages.length; i++) {
            admin.sendMessage(messages[i]);
        }
    }

    // Get players in range
    var nearbyPlayers = player.getSurroundingEntities(range, 1);

    // Check if any players in range
    if (!nearbyPlayers || nearbyPlayers.length === 0) {
        return;
    }

    // Send messages to all players in range
    for(var k=0; k<nearbyPlayers.length; k++) {
        if(isAdmin(nearbyPlayers[k])) { continue; }
        for (var i = 0; i < messages.length; i++) {
            nearbyPlayers[k].sendMessage(messages[i]);
        }
    }
}