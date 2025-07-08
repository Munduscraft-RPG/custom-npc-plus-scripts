function addChatMessage(player, message) {
    var ChatComponentText = Java.type('net.minecraft.util.ChatComponentText');
    player.player.func_145747_a(new ChatComponentText(message))
}
