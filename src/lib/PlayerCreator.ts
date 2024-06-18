import { Collection, User } from "discord.js";
import { Player } from "../types/Player";

export function CreatePlayers(userCollection: Collection<string, User> | undefined) {
  const players: Player[] = [];

  userCollection?.forEach((x) => {
    const urlStr = x.avatarURL();

    players.push({
      User: `<@${x.id}>`,
      IsAlive: true,
      Name: x.username,
      Url: urlStr !== null ? urlStr : "",
      Events: [],
      SurvivalRate: 1,
    });
  });

  return players;
}
