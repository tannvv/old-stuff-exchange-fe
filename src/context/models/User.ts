import Building from './Building';
import Role from './Role';
import Wallet from './Wallet';

export default class User {
    id: string;
    userName: string;
    fullName: string;
    status: string;
    phone: string;
    email: string;
    imageUrl: string;
    gender: string;
    role: Role | null;
    building: Building | null;
    wallets: Wallet[] | undefined;

    constructor(params: any) {
        this.id = params.id ?? '';
        this.userName = params.userName ?? '';
        this.fullName = params.fullName ?? '';
        this.status = params.status ?? '';
        this.email = params.email ?? '';
        this.phone = params.phone ?? '';
        this.imageUrl = params.imageUrl ?? '';
        this.gender = params.gender ?? '';
        this.role = params.role ? new Role(params.role?.id, params.role?.name) : null;
        this.building = params.building
            ? new Building(params.building?.id, params.building?.name, params.building?.apartmentId)
            : null;
    }
}

// export default class User {
//     id: string;
//     userName: string;
//     fullName: string;
//     status: string;
//     phone: string;
//     email: string;
//     imageUrl: string;
//     gender: string;
//     role: Role | null;
//     building: Building | null;

//     constructor(
//         id: string,
//         userName: string | null,
//         fullName: string | null,
//         status: string | null,
//         phone: string | null,
//         email: string | null,
//         imageUrl: string | null,
//         gender: string | null,
//         role: Role | null,
//         building: Building | null,
//     ) {
//         this.id = id;
//         this.userName = userName ?? '';
//         this.fullName = fullName ?? '';
//         this.status = status ?? '';
//         this.email = email ?? '';
//         this.phone = phone ?? '';
//         this.imageUrl = imageUrl ?? '';
//         this.gender = gender ?? '';
//         this.role = role;
//         this.building = building;
//     }
// }
