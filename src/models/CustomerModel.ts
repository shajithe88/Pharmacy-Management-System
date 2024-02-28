export interface Customer {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    isDeleted?: boolean;
    deletedUserId?:number;
    createdAt?: Date;
    updatedAt?: Date;
}
