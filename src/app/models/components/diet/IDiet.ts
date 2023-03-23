import { IUserAccount } from "../user/IUserAccount";
import { IDietStatement } from "./IDietStatement";

export interface IDiet{
    id: string;
    dietName: string;
    dietBalance: number;
    createdDate: string;
    statements?: IDietStatement[];
    userAccount?: IUserAccount;
    height?: number;
  }
  