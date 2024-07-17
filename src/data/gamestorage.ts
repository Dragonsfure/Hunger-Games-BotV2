import { GameClass } from "../types/GameClass";

class GlobalState {
  private static instance: GlobalState;
  private _game: GameClass | null = null;

  private constructor() {
    //Nothing
  }

  public static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  public get game(): GameClass | null {
    return this._game;
  }

  public set game(value: GameClass | null) {
    this._game = value;
  }
}

export const globalState = GlobalState.getInstance();

