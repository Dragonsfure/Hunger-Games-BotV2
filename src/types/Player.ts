import { GameUser } from "./GameUser";

export interface IPlayer {
  Id: string;

  Name: string;

  Url: string;

  IsAlive: boolean;

  SurvivalRate: number;

  Events: string[];

  DistNumber: number;
}

export class Player implements IPlayer {
  Id: string;

  Name: string;

  Url: string;

  IsAlive: boolean;

  SurvivalRate: number;

  Events: string[];

  DistNumber: number;

  constructor(user: GameUser, distNumb: number) {
    this.Name = user.Name;
    this.Url = user.PictureUrl;
    this.Id = user.Id;

    this.IsAlive = true;
    this.SurvivalRate = 1;
    this.Events = [];

    this.DistNumber = distNumb; 
  }
}

