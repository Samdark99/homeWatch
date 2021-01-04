export interface UserList{
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: User[];
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    roleId: string;
    active: boolean;
    createdAt: string;
}