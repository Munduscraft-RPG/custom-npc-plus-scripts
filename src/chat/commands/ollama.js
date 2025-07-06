function ollama(player, args) {
    var Runnable = Java.type("java.lang.Runnable");
    var Thread = Java.type("java.lang.Thread");
    var BufferedReader = Java.type("java.io.BufferedReader");
    var InputStreamReader = Java.type("java.io.InputStreamReader");

    var task = new Runnable({
        run: function () {
            try {
                var prompt = args.join(" ");
                var escapedPrompt = prompt.replace(/\\/g, "\\\\").replace(/"/g, '\\"'); // Escape backslashes and quotes
                var curlCommand = [
                    "curl",
                    "--silent",
                    "--no-buffer",
                    "-X", "POST",
                    "http://localhost:11434/api/generate",
                    "-d", "{\"model\":\"llama3:8b\",\"prompt\":\"" + escapedPrompt + "\"}"
                ];

                var ProcessBuilder = Java.type("java.lang.ProcessBuilder");
                var builder = new ProcessBuilder(curlCommand);
                builder.redirectErrorStream(true);
                var process = builder.start();

                var reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                var line;
                var result = "";
                while ((line = reader.readLine()) !== null) {
                    var match = line.match(/"response":"(.*?)"/);
                    if (match) {
                        result += match[1];
                    }
                }
                reader.close();
                process.waitFor();

                if (result.length > 0) {
                    // ✳️ Header
                    player.sendMessage(STYLE_BOLD + "[llama3:8b] Answering: " + STYLE_RESET + prompt);

                    // ✳️ Process response
                    var parts = result.split(/\\n|\\r\\n/); // literal \n from JSON
                    for each (var part in parts) {
                        var formatted = formatOllamaResponse(part);
                        if (formatted.trim().length > 0) {
                            var messages = wrapStyledMessage(formatted, 320)
                            for (var i = 0; i < messages.length; i++) {
                                player.sendMessage(messages[i]);
                            }
                        }
                    }
                } else {
                    player.sendMessage("[Ollama] No response received.");
                }

            } catch (e) {
                player.sendMessage("[Ollama Error] " + e.message);
            }
        }
    });

    new Thread(task).start();
}

function formatOllamaResponse(text) {
    text = text.replace(/\*\*(.+?)\*\*/g, STYLE_BOLD + "$1" + STYLE_RESET + STYLE_GRAY);
    text = text.replace(/\*(.+?)\*/g, STYLE_ITALIC + "$1" + STYLE_RESET + STYLE_GRAY);
    return text;
}