import style from "./Button.module.scss"

const Button = ({text,type,theme,icon,disabled,loading,onClick}) => {

    return (
        <div className={[style.button, theme == "green" ? style.green : style.gray].join(" ")}>
            <button type={type} onClick={onClick} disabled={disabled}>{loading?<span>O </span>:""}{icon}<span>{text}</span></button>
        </div>
    )
}

export default Button