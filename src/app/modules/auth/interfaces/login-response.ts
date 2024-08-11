export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    phone: string;
    address: string;
    gender: string;
    photo: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  TokenType: string;
  Token: string;
}
