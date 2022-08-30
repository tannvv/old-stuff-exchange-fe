export interface User {
    id: string;
    userName: string;
    fullName: string;
    status: string;
    phone: string;
    email: string;
    imageUrl: string;
    gender: string;
    createAt: Date;
    building: Building;
    role: Role;
}

export interface Role {
    id: string;
    name: string;
}

export interface Building {
    id: string;
    name: string;
    apartmentId: string;
}
