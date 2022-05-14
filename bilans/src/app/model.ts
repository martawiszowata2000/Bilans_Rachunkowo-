export class AccountBalance { //bilans konta
    constructor(
        id?: number,
        balance_sheet_account?: BalanceSheetAccount[]
        ) {}
}

export class BalanceSheetAccount { //konto bilansowe
    constructor(
        id: number,
        name: string,
        saldo?: number,
        debit?: BalanceSheetOperation[],
        credit?: BalanceSheetOperation[]
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