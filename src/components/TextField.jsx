import style from "./TextField.module.scss"

const TextField = ({id,label,type,value,isValid,disabled,errorMessage,onChange}) => {

    return(
        <div className={[style.textField, isValid === false ? style.error : ""].join(" ")}>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} onChange={onChange} value={value} disabled={disabled} />
            <p>{errorMessage}</p>
        </div>
    )
}

export default TextField