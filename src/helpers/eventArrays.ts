import { Player } from "../types/Player";
import { GetRandomIndex } from "./helpFunctions";

class BaseScenario {
  private readonly Scenario: string[];

  constructor(scenarios: string[]) {
    this.Scenario = scenarios;
  }

  public GetScenario(player: Player) {
    const index: number = GetRandomIndex(this.Scenario.length);

    const scenarioResult = this.Scenario[index].replace("{0}", player.Name);

    return scenarioResult;
  }
}

export class SingleScenario extends BaseScenario {
  constructor(scenarios: string[]) {
    super(scenarios);
  }
}

export const miscScenario = new SingleScenario([
  "{0} hunts fish",
  "{0} avoids a pack of lions",
  "{0} hides away in the trees ",
]);

export const slowDeathScenario = new SingleScenario([
  "{0} dies by dehydration",
  "{0} dies of hunger",
  "{0} bleeds out due to untreated wounds",
  "{0} dies by infection ",
]);

export const deathScenario = new SingleScenario([
  "{0} fell over and hit their head on a rock.",
  "Lions corner {0}. He is bitten into viciously",
  "{0} falls off the map",
  "A supply crate drops on the {0}'s head. They die",
  "{0} accidentally cuts himself and gets infected. ",
]);

export const injuryScenario = new SingleScenario([
  "{0} loses leg to a man eating monkey.",
  "{0} falls over and gets a concussion",
  "{0} touches a poisonous flower",
  "{0} is bit by a rare spider species ",
  "{0} catches a very bad illness",
]);

export const lightInjuryScenario = new SingleScenario([
  "{0} sprains ankle while tripping up thinking about their crush",
  "{0} pulls a leg while running ",
  "{0} injures his shoulder lifting heavy objects",
]);

export const lightBuffScenario = new SingleScenario([
  "{0} finds old tools in a cave",
  "{0} is given water and bandages from a sponsor",
  "{0} finds rabbits to hunt and eat",
  "{0} wakes up from a nap about his crush, they feel energetic",
]);

export const buffScenario = new SingleScenario([
  "{0} finds a gun with 3 bullets",
  "{0} is given a Med-kit from a sponsor ",
  "{0} steals another parties food and supplies",
]);
