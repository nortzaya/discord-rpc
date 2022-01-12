"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_1 = __importDefault(require("discord.js-selfbot"));
const rich_commands_1 = require("rich-commands");
const PREFIX = "un!";
let client = new discord_js_selfbot_1.default.Client({
    ws: {
        intents: [
            "GUILDS",
            "DIRECT_MESSAGES",
            "GUILD_MESSAGES",
            "GUILD_EMOJIS",
            "GUILD_MEMBERS",
        ]
    },
    disableMentions: "everyone"
});
let interval = 0;
let iteration = 0;
client.on("ready", function () {
    console.log(`[SelfBot]: ${client.user?.username} Online`);
    client.user?.setActivity({ name: "Horizon Zero Dawn™", type: "PLAYIN", url: "https://twitch.tv/lisenok_257" });
});
let commands = new Map()
    .set("setAnimateStatus", function (message, parse) {
    let delay = parseInt(parse.flags.delay);
    let type = parse.flags.type;
    let args = parse.args;
    clearInterval(interval);
    interval = setInterval(function () {
        iteration = ++iteration % args.length;
        client.user?.setActivity({ name: args[iteration], type });
    }, delay);
});
client.on("message", function (message) {
    if (message.author?.id != client.user?.id)
        return;
    if (!message.content.startsWith(PREFIX))
        return;
    let { name, args, flags } = (0, rich_commands_1.parseCommand)(message.content.slice(PREFIX.length));
    if (commands.has(name)) {
        let command = commands.get(name);
        command?.(message, { name, args, flags });
    }
});
client.login(process.env.TOKEN);
