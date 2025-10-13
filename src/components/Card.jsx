import style from "./Card.module.scss"

const Card = ({icon,title,amount,theme}) => {
    return(
        <div className={[style.card, theme == "dark" ? style.dark : "" ].join(" ")}>
            <div className={style.iconCanvas}>
                <img src={icon} />
            </div>
            <div className={style.content}>
                <h3>{title}</h3>
                <div>{amount}</div>
            </div>
        </div>
    )
}
export default Card