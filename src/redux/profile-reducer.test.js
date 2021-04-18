import { addPostActionCreator, profileReducer, deletePost } from "./profile-reducer"

let state = {
    posts: [
        { id: 5, message: 'hello' },
        { id: 4, message: 'Niko niko' },
        { id: 3, message: 'In three weeks,  i’m going to visit Iceland, it’ll be awesome!' },
        { id: 2, message: 'A minute ago met angry dude in locker, had to destroy his underpants' },
        { id: 1, message: 'Hello, ima new in dungeon!' },
    ],
}

it('increment post length', () => {
    let action = addPostActionCreator()
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6)
})

it('length after deleting should be decremented', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})