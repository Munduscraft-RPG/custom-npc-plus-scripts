function timers(player, args) {
    checkAdmin(player);

    if (args.length < 2) {
        throw "invalid_usage";
    }

    var subcommand = args[0];
    var target = getPlayerByName(args[1]);
    var timers = target.getTimers();

    switch (subcommand) {
        case 'get':
            if (args.length !== 2) throw "invalid_usage";

            var ids = timers.timerIds();
            if (ids.length === 0) {
                player.sendMessage(STYLE_SUCCESS + 'No active timers for ' + args[1]);
            } else {
                player.sendMessage(STYLE_SUCCESS + 'Active timers for ' + args[1]);
                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var ticks = timers.ticks(id);
                    var maxTicks = timers.maxTicks(id);
                    var repeat = timers.repeats(id);
                    player.sendMessage(
                        STYLE_RESET + 'ID: ' + id +
                        STYLE_GRAY + ' | Ticks: ' + ticks +
                        ' / ' + maxTicks +
                        ' | Repeats: ' + repeat
                    );
                }
            }
            return;

        case 'set':
            if (args.length !== 5) throw "invalid_usage";
            var id = parseInt(args[2]);
            var ticks = parseInt(args[3]);
            var repeat = args[4].toLowerCase() === 'true';
            if (timers.has(id)) {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' already exists for ' + args[1]);
                return;
            }
            timers.start(id, ticks, repeat);
            player.sendMessage(STYLE_SUCCESS + 'Started timer ID ' + id + ' for ' + args[1] + ' with ' + ticks + ' ticks, repeat: ' + repeat);
            return;

        case 'reset':
            if (args.length !== 3) throw "invalid_usage";
            var id = parseInt(args[2]);
            if (!timers.has(id)) {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' does not exist for ' + args[1]);
                return;
            }
            var maxTicks = timers.maxTicks(id);
            timers.setTicks(id, maxTicks);
            player.sendMessage(STYLE_SUCCESS + 'Reset timer ID ' + id + ' to max ticks (' + maxTicks + ') for ' + args[1]);
            return;

        case 'end':
            if (args.length !== 3) throw "invalid_usage";
            var id = parseInt(args[2]);
            if (!timers.has(id)) {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' does not exist for ' + args[1]);
                return;
            }
            timers.setTicks(id, 0);
            player.sendMessage(STYLE_SUCCESS + 'Set timer ID ' + id + ' to 0 ticks (ended) for ' + args[1]);
            return;

        case 'stop':
            if (args.length !== 3) throw "invalid_usage";
            var id = parseInt(args[2]);
            if (timers.stop(id)) {
                player.sendMessage(STYLE_SUCCESS + 'Stopped timer ID ' + id + ' for ' + args[1]);
            } else {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' is not running for ' + args[1]);
            }
            return;

        case 'remove':
            if (args.length !== 3) throw "invalid_usage";
            var id = parseInt(args[2]);
            if (!timers.has(id)) {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' does not exist for ' + args[1]);
                return;
            }
            timers.setMaxTicks(id, 0);
            timers.setTicks(id, 0);
            timers.setRepeats(id, false);
            player.sendMessage(STYLE_SUCCESS + 'Removed timer ID ' + id + ' for ' + args[1]);
            return;

        case 'clear':
            if (args.length !== 2) throw "invalid_usage";
            timers.clear();
            player.sendMessage(STYLE_SUCCESS + 'Cleared all timers for ' + args[1]);
            return;

        case 'change':
            if (args.length !== 4) throw "invalid_usage";
            var id = parseInt(args[2]);
            var seconds = parseInt(args[3]);
            if (!timers.has(id)) {
                player.sendMessage(STYLE_WARNING + 'Timer ID ' + id + ' does not exist for ' + args[1]);
                return;
            }
            var newTicks = seconds * 20;
            timers.setMaxTicks(id, newTicks);
            timers.setTicks(id, newTicks);
            player.sendMessage(STYLE_SUCCESS + 'Changed timer ID ' + id + ' to ' + newTicks + ' ticks (' + seconds + ' seconds) for ' + args[1]);
            return;

        default:
            throw "invalid_usage";
    }
}
