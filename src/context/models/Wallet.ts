import User from './User';

export default class Wallet {
    id: string;
    balance: number;
    type: string;
    createdAt: Date;
    lastUpdatedAt: Date | null;
    description: string | null;
    userId: string;
    user: User | null;

    constructor(params: any) {
        this.id = params.id ?? '';
        this.balance = params.balance ?? 0;
        this.type = params.type ?? '';
        this.createdAt = new Date(params.createdAt) ?? null;
        this.lastUpdatedAt = params.lastUpdatedAt ? new Date(params.lastUpdatedAt) : null;
        this.description = params.description ?? '';
        this.userId = params.userId ?? '';
        this.user = params.user ? new User(params.user) : null;
    }
}
