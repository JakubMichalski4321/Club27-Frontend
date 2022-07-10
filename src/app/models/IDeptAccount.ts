import { IDeptStatement } from "./IDeptStatement";

export interface IDeptAccount {

    balance: number;
    deptAccountName: string;
    userAccounts: IDeptAccount[];
    statements: IDeptStatement[];

}