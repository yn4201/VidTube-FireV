import { Video } from "./video.model";

export interface User {
    _id: string
    email: string;
    name: string;
    photoUrl: string;
    subscribers: number;
    subscriberList: any[];
    videoList: Video[];
 }