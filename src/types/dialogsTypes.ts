export enum DialogsActionTypes {
    ADD_MESSAGE = 'ADD_MESSAGE',
}

export interface DialogsState {
    chatData: IChatData[],
    messagesData: Array<IMessagesData>,
    newMessage: IMessagesData,
}

interface IChatData {
    id: number,
    avatar: string,
    name: string,
    lastMessage: string,
}

interface IMessagesData {
    id: number,
    message: string,
    avatar: string,
    messageTime: string,
}

interface AddMessageAction {
    type: DialogsActionTypes.ADD_MESSAGE,
    newMessageBody: string,
}

export type DialogsAction = AddMessageAction