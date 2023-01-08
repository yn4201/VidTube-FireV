import { Video } from "../models/video.model";

export interface VideoState{
    error: string;
    videoList: Video[];
    videoLoad: Video;
    isLoading: boolean;
    idToken: string;
    _id: string;
    isSuccess: boolean;
    isDelete : boolean;
}