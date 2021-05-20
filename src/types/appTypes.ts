export enum AppActionTypes {
    SET_INITIALIZED = 'SET_INITIALIZED'
}

interface SetInitializedAction {
    type: AppActionTypes.SET_INITIALIZED,
    payload: boolean,
}

export interface AppState {
    initialized: boolean,
}

export type AppAction = SetInitializedAction
