import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import s from './ToPostNew.module.css'
import React from "react"


const ToPostNew = (props) => {

    let postText = React.createRef()

    const addPost = () => {
        props.dispatch({ type: 'ADD-POST' })
    }

    const onPostChange = () => {
        let text = postText.current.value
        let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text }
        props.dispatch(action)
    }

    return (
        <div className={s.toPostNew}>
            <input onChange={onPostChange} value={props.newPostText} ref={postText} className={s.postInput} type='text' placeholder='Tell something new...'>
            </input>
            <button className={s.submitPost} onClick={addPost}>
                <span><FontAwesomeIcon icon={faPaperPlane} /></span>
            </button>
        </div>
    )
}

export default ToPostNew