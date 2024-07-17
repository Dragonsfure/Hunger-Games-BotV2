import { config } from "../config";
import { GameClass } from "../types/GameClass";

export function AliveCountLogExtra(game: GameClass) {
  if (config.NODE_ENV === "development") {
    console.log(
      `Playing the game with ${game} ${game.roundId} alive ${game.playersAlive}`
    );
  }
}

export function AliveCountLog(game: GameClass) {
  if (config.NODE_ENV === "development") {
    console.log(`Playing the game with ${game.playersAlive} alive`);
  }
}

export function RoundCountLog(game: GameClass) {
  if (config.NODE_ENV === "development") {
    console.log(`playing ${game.roundId} with this`);
  }
}

