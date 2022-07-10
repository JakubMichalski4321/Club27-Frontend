import { IDeptStatement } from "./IDeptStatement";

export interface IDeptAccount {

    id: string;
    balance: number;
    deptAccountName: string;
    userAccounts: IDeptAccount[];
    statements: IDeptStatement[];

}
