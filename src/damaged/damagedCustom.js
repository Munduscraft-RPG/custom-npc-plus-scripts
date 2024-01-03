var ALL_STYLE_RESET_REGEX = /&r/g;
var YELL_REGEX = /^(?:(?:&[a-z])|[^a-z\n])*!.*$/;
var WHISPER_REGEX = /^[^A-Z!]*\.{3}$/;
var NUMERIC_REGEX = /^-?\d+$/;
var EMPHASIS_REGEX = /\/(.*?)\//g;

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


function damagedCustom(event){
    var player = event.getPlayer();
    koPlayer(player);
}