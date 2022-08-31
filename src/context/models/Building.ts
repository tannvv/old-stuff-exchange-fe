export default class Building {
    id: string;
    name: string;
    apartmentId: string;

    constructor(id: string | null, name: string | null, apartmentId: string | null) {
        this.id = id ?? '';
        this.name = name ?? '';
        this.apartmentId = apartmentId ?? '';
    }
}
