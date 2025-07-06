function getCharWidth(c, isBold) {
    var width = CHARWIDTHS.chars[c];
    if (width == null) width = CHARWIDTHS.missing_char || 6.0;
    if (isBold) width += 1.0;
    return width;
}

function getStringWidth(text, isBold) {
    var width = 0;
    for (var i = 0; i < text.length; i++) {
        width += getCharWidth(text.charAt(i), isBold);
    }
    return width;
}

function wrapStyledMessage(message, maxPixelWidth) {
    var styleRegex = /&[0-9a-frk-or]/i;
    var messages = [];
    var currentLine = '';
    var activeStyles = [];
    var isBold = false;

    function getActiveStyleString() {
        var s = '';
        for (var i = 0; i < activeStyles.length; i++) {
            s += activeStyles[i];
        }
        return s;
    }

    function flushLine() {
        var trimmed = currentLine.replace(/^\s+|\s+$/g, '');
        if (trimmed.length > 0) {
            messages.push(trimmed);
        }
    }

    var i = 0;
    var styleBuffer = '';
    var linePixelWidth = 0;

    var wordBuffer = '';
    var wordPixelWidth = 0;
    var wordBold = isBold;

    while (i < message.length) {
        if (message.charAt(i) === '&' && i + 1 < message.length && styleRegex.test(message.substring(i, i + 2))) {
            var code = message.charAt(i + 1).toLowerCase();
            var fullCode = '&' + code;
            i += 2;

            styleBuffer += fullCode;

            if (code === 'r') {
                activeStyles = [];
                isBold = false;
            } else {
                if ("0123456789abcdef".indexOf(code) !== -1) {
                    for (var j = activeStyles.length - 1; j >= 0; j--) {
                        if ("0123456789abcdef".indexOf(activeStyles[j].charAt(1)) !== -1) {
                            activeStyles.splice(j, 1);
                        }
                    }
                } else if ("klmno".indexOf(code) !== -1) {
                    for (var j = activeStyles.length - 1; j >= 0; j--) {
                        if ("klmno".indexOf(activeStyles[j].charAt(1)) !== -1) {
                            activeStyles.splice(j, 1);
                        }
                    }
                }

                if (code === 'l') isBold = true;
                if (code === 'r') isBold = false;

                activeStyles.push(fullCode);
            }

            continue;
        }

        var ch = message.charAt(i);
        var chWidth = getCharWidth(ch, isBold);

        wordBuffer += styleBuffer + ch;
        wordPixelWidth += chWidth;
        wordBold = isBold;
        styleBuffer = '';

        // If the word ends
        if (ch === ' ') {
            if (linePixelWidth + wordPixelWidth > maxPixelWidth) {
                flushLine();
                currentLine = getActiveStyleString() + wordBuffer;
                linePixelWidth = wordPixelWidth;
            } else {
                currentLine += wordBuffer;
                linePixelWidth += wordPixelWidth;
            }

            wordBuffer = '';
            wordPixelWidth = 0;
        }

        // Force-break if the word itself is too long
        else if (wordPixelWidth > maxPixelWidth) {
            // Flush the current line
            if (linePixelWidth > 0) {
                flushLine();
                currentLine = getActiveStyleString();
                linePixelWidth = 0;
            }

            // Break the long word character by character
            for (var k = 0; k < wordBuffer.length; k++) {
                var char = wordBuffer.charAt(k);
                var width = getCharWidth(char, wordBold);

                if (linePixelWidth + width > maxPixelWidth) {
                    flushLine();
                    currentLine = getActiveStyleString();
                    linePixelWidth = 0;
                }

                currentLine += char;
                linePixelWidth += width;
            }

            wordBuffer = '';
            wordPixelWidth = 0;
        }

        i++;
    }

    // Add final buffered word
    if (wordBuffer.length > 0) {
        if (linePixelWidth + wordPixelWidth > maxPixelWidth) {
            flushLine();
            currentLine = getActiveStyleString() + wordBuffer;
        } else {
            currentLine += wordBuffer;
        }
    }

    if (currentLine.length > 0) {
        flushLine();
    }

    return messages;
}
