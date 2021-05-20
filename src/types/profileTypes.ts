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

interface PostsInterface {
    id: number,
    message: string
}

export interface ProfileInterface {
    userId: number,
    lookingForAJob?: boolean | undefined,
    lookingForAJobDescription?: string | undefined,
    fullName: string,
    contacts?: ContactsInterface | undefined,
    photos?: UserPhotosInterface | null,
}

export interface ContactsInterface {
    github?: string | undefined,
    vk?: string | undefined,
    facebook?: string | undefined,
    instagram?: string | undefined,
    twitter?: string | undefined,
    website?: string | undefined,
    youtube?: string | undefined,
    mainLink?: string,
}

export interface UserPhotosInterface {
    small: string | null,
    large: string | null,
}


interface AddPostAction {
    type: ProfileActionTypes.ADD_POST,
}

interface UpdatePostTextAction {
    type: ProfileActionTypes.UPDATE_NEW_POST_TEXT,
    newText: string,

}

interface SetUserProfileAction {
    type: ProfileActionTypes.SET_USER_PROFILE,
    profile: ProfileInterface,

}

interface SetUserJobAction {
    type: ProfileActionTypes.SET_USER_JOB,
    userJob: string,

}

interface DeletePostAction {
    type: ProfileActionTypes.DELETE_POST,
    postId: number,
}

interface SaveAvatarAction {
    type: ProfileActionTypes.SAVE_AVATAR,
    photos: UserPhotosInterface,
}

export type ProfileAction = AddPostAction | UpdatePostTextAction | SetUserProfileAction | SetUserJobAction
    | DeletePostAction | SaveAvatarAction