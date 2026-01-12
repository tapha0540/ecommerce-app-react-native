
export default interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface SignUpData extends FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface LoginData extends FormData {
  email: string;
  password: string;
}
