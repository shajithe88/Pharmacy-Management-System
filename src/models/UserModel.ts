export interface User {
    id?: number;
    name: string;
    username: string;
    password: string;
    role: string;
    secretKey?:string;
    isDeleted?:number;
    createdAt?: Date;
    updatedAt?: Date;
}