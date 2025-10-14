import style from "./Card.module.scss"
import { ShimmerCategoryItem } from "react-shimmer-effects"

const Card = ({icon,title,amount,theme,loading}) => {
    return(
        loading ? 
        <ShimmerCategoryItem
          hasImage
          imageType="circular"
          imageWidth={80}
          imageHeight={80}
          text
        />
        :
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