import style from "./Button.module.scss"
import Spinner from "./Spinner"

const Button = ({text,type,theme,icon,disabled,loading,onClick}) => {

    return (
        <div className={[style.button, theme == "green" ? style.green : ""].join(" ")}>
            <button type={type} onClick={onClick} disabled={disabled}>{loading?<Spinner />:""}{icon}<span>{text}</span></button>
        </div>
    )
}

export default Button