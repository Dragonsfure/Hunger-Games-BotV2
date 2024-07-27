import { Collection, User } from "discord.js";
import { GameUser } from "../types/GameUser";

export function GetUsers(userCollection: Collection<string, User> | undefined) {
  const players: GameUser[] = [];

  userCollection?.forEach((x) => {
    const urlStr = x.avatarURL();

    players.push({
      Id: x.id,
      Name: x.username,
      PictureUrl:
        urlStr !== null
          ? urlStr
          : "https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg",
    });
  });

  return players;
}

