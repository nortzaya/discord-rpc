"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_1 = require("discord.js-selfbot");
const ArgumentParser_1 = require("./ArgumentParser.js");
const client = new discord_js_selfbot_1.Client({
    ws: {
        intents: ['GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILDS', 'DIRECT_MESSAGES', 'GUILD_PRESENCES']
    }
});
const PREFIX = "+";
client.on("ready", function () {
    console.log(`[SelfBot]: "${client.user?.tag}" login`);
    client.user?.setPresence({
        status: "dnd",
        activity: {
            name: "Tom Clancy's Rainbow Six Siege",
            type: "STREAMING",
            url: "https://twitch.tv/lisenok_257"
        }
    });
});
client.on("message", function (message) {
    if (client.user?.id != message.author?.id)
        return;
    if (!message.content?.startsWith(PREFIX))
        return;
    let parse = new ArgumentParser_1.ArgumentParser(message.content?.slice(PREFIX.length));
    let command = parse.part();
    let channel = client.channels.cache.find(e => e.id == "889442382662213633");
    if (command == "setStatus") {
        let [status, name, type, url] = parse.parts();
        try {
            client.user?.setPresence({
                status: status,
                activity: {
                    name: name,
                    type: type,
                    url: url ?? "https://twitch.tv/lisenok_257"
                }
            });
        }
        catch (error) {
            channel.send(`\`\`\`\n${error}\`\`\``);
        }
    }
    else if (command == "help") {
        let embed = new discord_js_selfbot_1.MessageEmbed()
            .addField("status:", [
            "```\ninvisible - Невидимый",
            "online - В сети",
            "idle - Неактивен",
            "dnd - Не беспокоить```"
        ], true)
            .addField("type:", [
            "```\nPLAYING - Играет в ...",
            "STREAMING - Стримит ...",
            "LISTENING - Слушает ...",
            "WATCHING - Смотрит ...```"
        ], true)
            .setDescription([
            `\`\`\`\nИспользование '${PREFIX}setStatus <status> <name> <type> [url]'`,
            `Пример #1: \n'${PREFIX}setStatus idle YouTube WATCHING' (Смотрит YouTube)`,
            `Пример #2: \n'${PREFIX}setStatus idle Minecraft PLAYING' (Играет в Minecraft)`,
            `Пример #3: \n'${PREFIX}setStatus idle \"Lofi hip hop\" LISTENING' (Слушает Lofi hip hop)`,
            `Пример #4: \n'${PREFIX}setStatus idle Minecraft STREAMING' (Стримит Minecraft)`,
            `Пример #5: \n'${PREFIX}setStatus idle Minecraft STREAMING https://twitch.tv/lisenok_257' (Стримит Minecraft)\`\`\``,
        ])
            .setColor(0x2A70F1);
        channel.send(embed);
    }
});
client.login(process.env.TOKEN);
