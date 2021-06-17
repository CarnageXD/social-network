export enum ProfileActionTypes {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    SET_USER_JOB = 'SET_USER_JOB',
    DELETE_POST = 'DELETE_POST',
    SAVE_AVATAR = 'SAVE_AVATAR',
}

export interface ProfileState {
    profile: ProfileInterface | null,
    posts: PostsInterface[]
    newPostText: string,
    userJob: string,
    photos: null | UserPhotosInterface,
}

export interface PostsInterface {
    id: number,
    message: string
}

export interface ProfileInterface {
    userId: number,
    lookingForAJob?: boolean | undefined,
    lookingForAJobDescription?: string | undefined,
    fullName: string,
    contacts: ContactsInterface,
    photos?: UserPhotosInterface | null,
}

export interface ContactsInterface {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

export interface UserPhotosInterface {
    small: string | null,
    large: string | null,
}