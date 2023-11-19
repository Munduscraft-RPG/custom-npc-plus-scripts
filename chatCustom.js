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

    //Parse q commands seperate from chat
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
    if(player.hasStoredData('isDrunk') && player.getStoredData('isDrunk')) {
        message = drunkDistort(message);
    }

    // Format message into a full chat message
    message = name + STYLE_RESET + ': ' + message;

    // Send message to self
    player.sendMessage(message);

    // Get players in range
    var nearbyPlayers = player.getSurroundingEntities(range, 1);

    // Check if any players in range
    if (!nearbyPlayers || nearbyPlayers.length === 0) {
        return;
    }

    // Send messages to all players in range
    for(var i=0; i<nearbyPlayers.length; i++) {
        nearbyPlayers[i].sendMessage(message);
    }
    return;
}

// Function that takes in a message and distorts it to be drunk text
function drunkDistort(message) {

    //List of rules for distorting the text
    var distortionRules = [
        { from: "s", to: "sh", probability: 0.9 },
        { from: "ch", to: "sh", probability: 0.7 },
        { from: "h", to: "hh", probability: 0.6 },
        { from: "th", to: "thl", probability: 0.4 },
        { from: "sch", to: "shk", probability: 0.6 },
        { from: "u", to: "uuh", probability: 0.2 },
        { from: "y", to: "yy", probability: 0.6 },
        { from: "e", to: "ee", probability: 0.4 },
        { from: "you", to: "u", probability: 0.4 },
        { from: "u", to: "uo", probability: 0.6 },
        { from: "that", to: "taht", probability: 0.2 },
        { from: "them", to: "thems", probability: 0.4 },
        { from: "p", to: "b", probability: 0.3 },
        { from: "p", to: "b", probability: 0.7 },
        { from: "up", to: "ubb", probability: 0.8 },
        { from: "o", to: "oh", probability: 0.2 },
        { from: "ei", to: "i", probability: 0.3 },
        { from: "b", to: "bb", probability: 0.8 },
        { from: "!!!", to: "!!!111!!!eleven!1!", probability: 0.5 },
        { from: "!", to: "!!", probability: 0.9 },
        { from: "drunk", to: "dhrkunn", probability: 0.7 },
        { from: "walk", to: "whhealhk", probability: 0.8 },
        { from: "wtf", to: "wft", probability: 0.2 },
        { from: "lol", to: "loool", probability: 0.8 },
        { from: "afk", to: "aafkayyy", probability: 0.3 },
        { from: "write", to: "wreitt", probability: 0.8 },
        { from: "drink", to: "booze", probability: 0.8 },
        { from: "like", to: "LOVE", probability: 0.9},
        { from: "want", to: "NEED", probability: 0.9},
        { from: "?", to: "????", probability: 0.8 },
        { from: ":)", to: ";)", probability: 1.0},
        { from: ":D", to: ";)", probability: 1.0},
        { from: ":-)", to: "8==D", probability: 1.0},
        { from: ":3", to: ";3", probability: 1.0},
        { from: " ", to: " *hic* ", probability: 0.2}
    ];

    // Start building the distorted message
    var distortedMessage = '';

    // For each charectar in the message
    var i = 0;
    while (i < message.length) {
        var replaced = false;

        // See if any rules apply and apply them
        for (var j = 0; j < distortionRules.length; j++) {

            var rule = distortionRules[j];
            var fromLength = rule.from.length;
            var messageSubstring = message.substr(i, fromLength).toLowerCase();
            var ruleFromLower = rule.from.toLowerCase();

            // If a rule does apply, apply it
            if (messageSubstring === ruleFromLower && Math.random() < rule.probability) {

                // Make change
                distortedMessage += rule.to;

                // Skip however many charectars are needed to get to the next unmodified charectar
                i += fromLength;

                replaced = true;
                break;
            }
        }
        // If nothing is changed
        if (!replaced) {

            // Do not change anything
            distortedMessage += message[i];

            // Move to next charectar
            i++;
        }
    }

    return distortedMessage;
}