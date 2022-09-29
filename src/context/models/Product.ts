import Post from './Post';

class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    status: string;
    categoryId: string;
    category: any;
    postId: string;
    post?: Post;

    constructor(params: any) {
        this.id = params.id ?? '';
        this.name = params.name ?? '';
        this.description = params.description ?? '';
        this.price = params.price ?? 0;
        this.status = params.status ?? '';
        this.categoryId = params.categoryId ?? '';
        this.category = params.category;
        this.postId = params.postId ?? '';
        this.post = params.post ? new Post(params.post) : undefined;
    }
}

export default Product;
