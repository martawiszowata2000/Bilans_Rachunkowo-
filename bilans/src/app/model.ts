export class Balance { //bilans konta
    constructor(
        id: string,
        name: string,
        sumActive: number,
        sumPassive: number,
        currency: string,
        accountsActive: BalanceItem,
        accountsPassive: BalanceItem
        ) {}
}

export class Account { //konto bilansowe
    constructor(
        id: number,
        path: string,
        name: string,
        balance: number,
        debit?: BalanceSheetOperation[],
        credit?: BalanceSheetOperation[]
        ) {}
}

export class BalanceItem{ //konto bilansowe
    constructor(
        id: string,
        path: string,
        name: string,
        account: Account,
        list?: BalanceItem
        ) {}
}

export class BalanceSheetOperation { //operacja bilansowa
    constructor(
        id: number,
        timeStamp: Date,
        amount: number
    ) {}
}

export enum BalanceOperation { //typu operacji bilansowych
    active = 'active',
    passive = 'passive',
    active_passive_up = 'active-passive_up',
    active_passive_down = 'active-passive_down'
}

export interface Operation {
        name: string
        list?: Array<Operation>
}

