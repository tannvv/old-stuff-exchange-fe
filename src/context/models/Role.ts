export default class Role {
    id: string;
    name: string;
    constructor(id: string | null, name: string | null) {
        this.id = id ?? '';
        this.name = name ?? '';
    }
}
