import preloader from './../../../img/preloader.svg'
import s from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.preloaderPosition}>
            <img src={preloader}></img>
        </div>
    )
}

export default Preloader