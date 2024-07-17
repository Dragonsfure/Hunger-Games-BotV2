import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { globalState } from "../data/gamestorage";

export const data = new SlashCommandBuilder()

  .setName("fstopgame")
  .setDescription("Force Stops a playing Game");

export async function execute(interaction: CommandInteraction) {
  if (globalState.game) {
    globalState.game = null;

    if (globalState.game === null) {
      return interaction.reply({
        content: "Stopped a running Games successfully",
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        content: "Some Error occurred, while trying to stop a running game!",
        ephemeral: true,
      });
    }
  } else {
    return interaction.reply({
      content: "There was no Game to force Stop, please use the /host Command",
      ephemeral: true,
    });
  }
}
