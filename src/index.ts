import {
  ActivityType,
  Client,
  GatewayIntentBits,
} from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log("Discord bot is ready! 🤖");
  client.user?.setActivity({
    type: ActivityType.Custom,
    name: "customstatus",
    state: "Playing Hunger-Games",
  });
  await deployCommands();
});

client.on("guildCreate", async () => {
  await deployCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
