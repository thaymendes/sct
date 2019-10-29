import { ProfileType } from '../enums/profile-type.enum';

export interface ProfileUser {
    id?: string;
    typeProfile?: ProfileType;
    name?: string;
    cpf?: string;
    contact?: string;
    addres?: string;
    district?: string;
    complement?: string;
    city?: string;
    uf?: string;
    picture?: string;
    birthday?: string;
    createdAt?: number;
    userId?: string;
}
