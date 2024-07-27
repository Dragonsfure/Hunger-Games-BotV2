import { Game } from "../types/Game";

class GlobalState {
  private static instance: GlobalState;
  private _game: Game | null = null;

  private constructor() {
    //Nothing
  }

  public static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  public get game(): Game | null {
    return this._game;
  }

  public set game(value: Game | null) {
    this._game = value;
  }
}

export const globalState = GlobalState.getInstance();

