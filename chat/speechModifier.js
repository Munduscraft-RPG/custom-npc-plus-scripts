function speechModifier(type, message) {
    switch (type) {
        case 'tipsy':
            var speechRules = [
                {from: "s", to: "sh", probability: 0.9},
                {from: "ch", to: "sh", probability: 0.7},
                {from: "h", to: "hh", probability: 0.6},
                {from: "th", to: "thl", probability: 0.4},
                {from: "sch", to: "shk", probability: 0.6},
                {from: "u", to: "uuh", probability: 0.2},
                {from: "y", to: "yy", probability: 0.6},
                {from: "e", to: "ee", probability: 0.4},
                {from: "you", to: "u", probability: 0.4},
                {from: "u", to: "uo", probability: 0.6},
                {from: "that", to: "taht", probability: 0.2},
                {from: "them", to: "thems", probability: 0.4},
                {from: "p", to: "b", probability: 0.3},
                {from: "p", to: "b", probability: 0.7},
                {from: "up", to: "ubb", probability: 0.8},
                {from: "o", to: "oh", probability: 0.2},
                {from: "ei", to: "i", probability: 0.3},
                {from: "b", to: "bb", probability: 0.8},
                {from: "!!!", to: "!!!111!!!eleven!1!", probability: 0.5},
                {from: "!", to: "!!", probability: 0.9},
                {from: "drunk", to: "dhrkunn", probability: 0.7},
                {from: "walk", to: "whhealhk", probability: 0.8},
                {from: "wtf", to: "wft", probability: 0.2},
                {from: "lol", to: "loool", probability: 0.8},
                {from: "afk", to: "aafkayyy", probability: 0.3},
                {from: "write", to: "wreitt", probability: 0.8},
                {from: "drink", to: "booze", probability: 0.8},
                {from: "like", to: "LOVE", probability: 0.9},
                {from: "want", to: "NEED", probability: 0.9},
                {from: "?", to: "????", probability: 0.8},
                {from: ":)", to: ";)", probability: 1.0},
                {from: ":D", to: ";)", probability: 1.0},
                {from: ":-)", to: "8==D", probability: 1.0},
                {from: ":3", to: ";3", probability: 1.0},
                {from: " ", to: " *hic* ", probability: 0.2}
            ];
            break;
        case 'uwu':
            speechRules = [
                {from: "r", to: "w", probability: 0.8},
                {from: "l", to: "w", probability: 0.8},
                {from: "th", to: "d", probability: 0.7},
                {from: "no", to: "nu", probability: 0.7},
                {from: "ove", to: "uv", probability: 0.7},
                {from: "u", to: "uwu", probability: 0.3},
                {from: "you", to: "yuw", probability: 0.5},
                {from: "!", to: "!! uwu", probability: 0.6},
                {from: ".", to: " uwu.", probability: 0.5},
                // Add more rules as desired
            ];
            break;

        default:
            return message;
    }

    // Start building the new message
    var newMessage = '';
    // For each charectar in the message
    var i = 0;
    while (i < message.length) {
        var replaced = false;

        // See if any rules apply and apply them
        for (var j = 0; j < speechRules.length; j++) {

            var rule = speechRules[j];
            var fromLength = rule.from.length;
            var messageSubstring = message.substr(i, fromLength).toLowerCase();
            var ruleFromLower = rule.from.toLowerCase();

            // If a rule does apply, apply it
            if (messageSubstring === ruleFromLower && Math.random() < rule.probability) {

                // Make change
                newMessage += rule.to;

                // Skip however many charectars are needed to get to the next unmodified charectar
                i += fromLength;

                replaced = true;
                break;
            }
        }
        // If nothing is changed
        if (!replaced) {

            // Do not change anything
            newMessage += message[i];

            // Move to next charectar
            i++;
        }
    }
    return newMessage;
}

