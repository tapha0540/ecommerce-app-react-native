
export default interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface SignUpData  {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
