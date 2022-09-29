export default interface CreatePostReq {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    authorId: string;
    products: CreateProduct[];
}

export interface CreateProduct {
    name: string;
    description: string;
    price: number;
    status: string;
    categoryId: string;
    postId: string;
}
