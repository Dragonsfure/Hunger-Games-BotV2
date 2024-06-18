import { EmbedBuilder } from "discord.js";
import { client } from "../index";

export function GetBaseEmbed(){
    return new EmbedBuilder()
    .setTimestamp()
    .setFooter({
      text: "Hosted by Hunger games bot",
      iconURL: `${client.user?.avatarURL()}`,
    }); 
} 