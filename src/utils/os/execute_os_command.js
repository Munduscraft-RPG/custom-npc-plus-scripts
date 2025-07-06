function execute_os_command(commandArray) {
    var ProcessBuilder = Java.type("java.lang.ProcessBuilder");
    var InputStreamReader = Java.type("java.io.InputStreamReader");
    var BufferedReader = Java.type("java.io.BufferedReader");
    var TimeUnit = Java.type("java.util.concurrent.TimeUnit");

    var builder = new ProcessBuilder(commandArray);
    builder.redirectErrorStream(true);
    var process = builder.start();

    var reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
    var lines = [];
    var line;

    // Read output in a separate thread to avoid deadlock
    var readThread = new java.lang.Thread(function() {
        try {
            while ((line = reader.readLine()) !== null) {
                lines.push(line);
            }
            reader.close();
        } catch (e) {
            lines.push("[ERROR] Failed reading output: " + e.message);
        }
    });
    readThread.start();

    // Wait with timeout (e.g., 30 seconds)
    var finished = process.waitFor(30, TimeUnit.SECONDS);
    if (!finished) {
        lines.push("[WARN] Process took too long and was terminated.");
        process.destroyForcibly();
    }

    readThread.join(); // Wait for the reader to finish

    return lines;
}
