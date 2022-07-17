import { IDeptStatement } from "./IDeptStatement";
import { IDeptUser } from "./IDeptUser";

export interface IDeptAccount {

    id: string;
    createdDate: string;
    balance: number;
    deptAccountName: string;
    userAccounts: IDeptUser[];
    statements: IDeptStatement[];

}
