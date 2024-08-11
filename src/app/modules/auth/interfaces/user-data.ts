export interface UserData {
    user: {
        name: string;
        email: string;
        phone: string;
        gender: string;
        photo: string;
        address: string;
        updated_at: string;
        created_at: string;
        id: number;
    }
    tokenType: string;
    access_token: string;
}
