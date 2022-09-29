export default class Transaction {
    id: string;
    description: string;
    status: string;
    type: string;
    coinExchange: number;
    balance: number;
    createdAt: Date | null;
    walletId: string;

    constructor(params: any) {
        this.id = params.id ?? '';
        this.description = params.description ?? '';
        this.status = params.status ?? '';
        this.type = params.type ?? '';
        this.coinExchange = params.coinExchange ?? '';
        this.balance = params.balance ?? '';
        this.createdAt = new Date(params.createdAt) ?? null;
        this.walletId = params.walletId ?? '';
    }
}
