import style from "./Logo.module.scss"

const Logo = () => {
    return(
        <div className={style.logo}>
            <img src="/img/maglo_logo.svg" alt="Maglo Logo" />
            <span>Maglo.</span>
        </div>
    )
}

export default Logo