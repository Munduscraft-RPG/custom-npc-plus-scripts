var ALL_STYLE_RESET_REGEX = /&r/g;
var YELL_REGEX = /^(?:(?:&[a-z])|[^a-z\n])*!.*$/;
var WHISPER_REGEX = /^[^A-Z!]*\.{3}$/;
var NUMERIC_REGEX = /^-?\d+$/;
var EMPHASIS_REGEX = /\*(.*?)\*/g;

//Vanilla Styles
var STYLE_BLACK = '&0';
var STYLE_DARK_BLUE = '&1';
var STYLE_DARK_GREEN = '&2';
var STYLE_DARK_AQUA = '&3';
var STYLE_DARK_RED = '&4';
var STYLE_DARK_PURPLE = '&5';
var STYLE_GOLD = '&6';
var STYLE_GRAY = '&7';
var STYLE_DARK_GRAY = '&8';
var STYLE_BLUE = '&9';
var STYLE_GREEN = '&a';
var STYLE_AQUA = '&b';
var STYLE_RED = '&c';
var STYLE_PURPLE = '&d';
var STYLE_YELLOW = '&e';
var STYLE_WHITE = '&f';
var STYLE_OBFUSCATED = '&k';
var STYLE_BOLD = '&l';
var STYLE_STRIKETHROUGH = '&m';
var STYLE_UNDERLINE = '&n';
var STYLE_ITALIC = '&o';
var STYLE_RESET = '&r';

// Custom Styles
var STYLE_YELL = STYLE_RESET + STYLE_BOLD;
var STYLE_WHISPER = STYLE_RESET + STYLE_GRAY + STYLE_ITALIC;
var STYLE_EMPHASIS = STYLE_ITALIC;
var STYLE_SUCCESS = STYLE_RESET + STYLE_GREEN;
var STYLE_WARNING = STYLE_RESET + STYLE_YELLOW;
var STYLE_FAILURE = STYLE_RESET + STYLE_RED;

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
    message = message.replace(/\*(.*?)\*/g, STYLE_EMPHASIS+'$1'+STYLE_RESET);

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
    if(player.hasStoredData('isTipsy') && player.getStoredData('isTipsy')) {
        message = speechModifier('tipsy', message);
    }

    // Format message into a full chat message
    message = name + STYLE_RESET + ': ' + message;

    // Send message to self
    player.sendMessage(message);

    // Get list of admins
    var adminList = JSON.parse(API.getIWorld(0).getStoredData("adminList") || '[]');

    // Send message to each admin
    for(var i=0;i<adminList.length;i++) {
        var admin = API.getPlayer(adminList[i]);
        if(!admin || admin === player ) { continue; }
        admin.sendMessage(message);
    }

    // Get players in range
    var nearbyPlayers = player.getSurroundingEntities(range, 1);

    // Check if any players in range
    if (!nearbyPlayers || nearbyPlayers.length === 0) {
        return;
    }

    // Send messages to all players in range
    for(var j=0; j<nearbyPlayers.length; j++) {
        if(adminList.indexOf(nearbyPlayers[j].getName()) !== -1) { continue; }
        nearbyPlayers[j].sendMessage(message);
    }
}