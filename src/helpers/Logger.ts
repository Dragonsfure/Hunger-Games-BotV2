import { config } from "../config";
import { Game } from "../types/Game";

export function AliveCountLogExtra(game: Game) {
  if (config.NODE_ENV === "development") {
    console.log(
      `Playing the game with ${game} ${game.roundId} alive ${game.playersAlive}`
    );
  }
}

export function AliveCountLog(game: Game) {
  if (config.NODE_ENV === "development") {
    console.log(`Playing the game with ${game.playersAlive} alive`);
  }
}

export function RoundCountLog(game: Game) {
  if (config.NODE_ENV === "development") {
    console.log(`playing ${game.roundId} with this`);
  }
}

