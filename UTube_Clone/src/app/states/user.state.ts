import { User } from "../models/user.model";

export interface UserState{
    error: string;
    userIdToSub: string;
    user: User;
}