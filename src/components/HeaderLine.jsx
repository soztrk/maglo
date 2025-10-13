import style from "./HeaderLine.module.scss"

// icons
import arrow_right_icon from "../assets/img/arrow_right_icon.svg"
import more_icon from "../assets/img/more_icon.svg"

const HeaderLine = ({title,more}) => {

    return(
        <div className={style.headerLine}>
            <h2>{title}</h2>
            <a href="#">
                { more ? "" : "View All "}
                { more ? <img src={more_icon} /> : <img src={arrow_right_icon} /> }
            </a>
        </div>
    )
}
export default HeaderLine