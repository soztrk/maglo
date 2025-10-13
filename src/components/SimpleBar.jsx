import style from "./SimpleBar.module.scss"

const SimpleBar = ({image,name,date,amount}) => {
    return(
        <div className={style.simpleBar}>
            <div className={style.name}>
                <img src={image} />
                <div>
                    <h5>{name}</h5>
                    <p>{date}</p>
                </div>
            </div>
            <div className={style.amount}>
                {amount}
            </div>
        </div>
    )
}
export default SimpleBar