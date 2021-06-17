import s from './contactMe.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FC } from 'react';
import { ContactsInterface, ProfileInterface } from '../../../../types/reducersTypes/profileTypes';



const handleContactKey = (contact: string, contactURL: string) => {
    switch (contact) {
        case "facebook":
            return <a href={`${contactURL}`} target='_blank' rel="noreferrer">
                <div><FontAwesomeIcon className={s.contactIcon} icon={faFacebook} /></div></a>;
        case "instagram":
            return <a href='https://www.instagram.com/' target='_blank' rel="noreferrer">
                <div><FontAwesomeIcon className={s.contactIcon} icon={faInstagram} /></div></a>;
        case "github":
            return <a href='https://www.github.com/' target='_blank' rel="noreferrer">
                <div><FontAwesomeIcon className={s.contactIcon} icon={faGithub} /></div></a>;
        default:
            return null;
    }
}

interface ContactMePropsInterface {
    profile: ProfileInterface
}

const ContactMe: FC<ContactMePropsInterface> = (props) => {
    return (
        <div className={s.contactMeWrapper}>
            {
                Object.keys(props.profile.contacts).map((key) =>
                    handleContactKey(key, props.profile.contacts[key as keyof ContactsInterface]))
            }
        </div>
    )
}

export default ContactMe