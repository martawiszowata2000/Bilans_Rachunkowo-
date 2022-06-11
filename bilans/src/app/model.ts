export class Balance { //bilans konta
    constructor(
        _id?: string,
        date?: Date,
        name?: string,
        sumActive?: number,
        sumPassive?: number,
        currency?: string,
        accountsActive?: Account[],
        accountsPassive?: Account[]
        ) {}
}

export interface Balance { //bilans konta
    _id: string,
    date: Date,
    name: string,
    sumActive: number,
    sumPassive: number,
    currency: string,
    accountsActive: Account[],
    accountsPassive: Account[]
}

export class Account { //konto bilansowe
    constructor(
        id: number,
        path: string,
        name: string,
        balance: number,
        initialBalance: number,
        debit?: Operation[],
        credit?: Operation[]
        ) {}
}

export interface Account { //konto bilansowe
    id: number,
    path: string,
    name: string,
    balance: number,
    initialBalance: number,
    debit?: Operation[],
    credit?: Operation[]
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

export class Operation { //operacja bilansowa
    constructor(
        id?: number,
        type?: string,
        timeStamp?: Date,
        amount?: number,
        from?: string,
        to?: string
    ) {}
}
export interface Operation {
    id: number,
    type: string,
    timeStamp: Date,
    amount: number,
    from: string,
    to: string
}


