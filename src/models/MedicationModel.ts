export interface Medication {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    isDeleted?: boolean;
    deletedUserId?:number
    lastUpdatedUserId?:number
    createdAt?: Date;
    updatedAt?: Date;
}
