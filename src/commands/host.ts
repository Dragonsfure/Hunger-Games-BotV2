import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteractionOptionResolver,
  MessageReaction,
  ChannelType,
  TextChannel,
} from "discord.js";
import { client } from "..";
import ms from "ms";
import { Game } from "../types/Game";
import { GetBaseEmbed } from "../lib/BaseEmbed";
import { CreatePlayers } from "../lib/PlayerCreator";
import { globalState } from "../data/gamestorage";

export const data = new SlashCommandBuilder()

  .setName("host")
  .setDescription("Start Hosting the Hunger Games")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("What channel would you like this message to appear in")
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .addStringOption((op) =>
    op
      .setName("message")
      .setDescription("What message would you like to appear in the channel")
      .setRequired(true)
  )
  .addStringOption((timer) =>
    timer
      .setName("time")
      .setDescription("How much time before the hunger games begins")
      .setRequired(true)
  )
  .addIntegerOption((playerCount) =>
    playerCount
      .setName("players")
      .setDescription("How many people will be playing?")
      .setRequired(true)
  )
  .addStringOption((delayTime) =>
    delayTime
      .setName("delaytime")
      .setDescription(
        "How much time till the next Picture (should be at least 2s)"
      )
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const info = interaction.options as CommandInteractionOptionResolver;

  //Get the Specific Information's from the Command
  const channel = info.getChannel("channel") as TextChannel;
  const message = info.getString("message");
  const timer = info.getString("time");
  const playerCount = info.getInteger("players");
  const guildId = interaction.guildId;
  console.log(timer);
  const numbTime = ms(timer as string);
  const delayTime = info.getString("delaytime");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const delayAsNumb = ms(delayTime!);

  if (globalState.game) {
    return interaction.reply({
      content: "A Game is still runnning force it to stop with the /fStopGame ",
      ephemeral: true,
    });
  }

  if (guildId) {
    const exampleEmbed = GetBaseEmbed()
      .setColor(0x0099ff)
      .setTitle("Hunger games")
      .setDescription(message);

    if (message && channel && playerCount) {
      CollectUsers(channel, exampleEmbed, numbTime, playerCount, delayAsNumb);
    }
  }
  return interaction.reply({
    content: `Done! The message should appear after ${timer} ms in <#${channel?.id}> `,
    ephemeral: true,
  });
}

async function CollectUsers(
  channel: TextChannel,
  embedMessage: EmbedBuilder,
  timer: number,
  playerCount: number,
  delay: number
) {
  channel.send({ embeds: [embedMessage] }).then((embedMessage) => {
    embedMessage.react("👍");

    const collectorFilter = (reaction: MessageReaction) => {
      return reaction.emoji.name == "👍";
    };

    const collector = embedMessage.createReactionCollector({
      filter: collectorFilter,
      time: timer,
      maxUsers: playerCount + 1,
    });

    collector.on("end", (collected) => {
      const users = collected
        .get("👍")
        ?.users.cache.filter((x) => x.id !== client.application?.id);

      //Create the Players from the
      const players = CreatePlayers(users);
      channel.send("The Collection ended");

      const myGame = new Game(players, channel, delay);
      globalState.game = myGame;

      if (globalState.game) {
        console.log(`Current game is running`);
      } else {
        console.log("No game is set");
      }
      myGame.StartGame();
    });
  });
}

