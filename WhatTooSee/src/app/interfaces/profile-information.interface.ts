export interface Profile {
    _id: string;
    email: string;
    username: string;
    password: string;
    photo: string;
    description: string;
    follow: number;
    followers: number;
    is_admin: number;
    following:string[];
  }