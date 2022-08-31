import { User } from '~/context/models';
export default class Post {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    createdAt: Date;
    expired: Date | null;
    lastUpdatedAt: Date | null;
    publishedAt: Date | null;
    status: string;
    authorId: string;
    author: User | null;
    userBought: string;
    userBoughtObject: User | null;
    products: any;

    constructor(params: any) {
        this.id = params.id;
        this.title = params.title ?? '';
        this.description = params.description ?? '';
        this.imageUrl = params.imageUrl ?? '';
        this.price = params.price ?? '';
        this.createdAt = new Date(params.createdAt);
        this.expired = params.expired ? new Date(params.expired) : null;
        this.lastUpdatedAt = params.lastUpdatedAt ? new Date(params.lasUpdatedAt) : null;
        this.publishedAt = params.publishedAt ? new Date(params.publishedAt) : null;
        this.status = params.status ?? '';
        this.authorId = params.authorId ?? '';
        this.author = params.author ? new User(params.author) : null;
        this.userBought = params.userBought ?? '';
        this.userBoughtObject = params.userBoughtObject ? new User(params.userBoughtObject) : null;
        this.products = params.product;
    }
}
