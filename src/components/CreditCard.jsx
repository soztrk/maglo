import style from "./CreditCard.module.scss"
import { ShimmerThumbnail } from "react-shimmer-effects";

//icons
import chip_icon from "../assets/img/chip_icon.svg"
import wifi_icon from "../assets/img/wifi_icon.svg"
import mcard_icon from "../assets/img/mcard_icon.svg"
import visa_icon from "../assets/img/visa_icon.svg"

const CreditCard = ({bank,cardNumber,expireDate,network,theme,loading}) => {
    return(
        loading ?
        <ShimmerThumbnail height={210} rounded />
        :
        <div className={[style.creditCard, theme == "transparent" ? style.transparent : style.dark].join(" ")}>
            <h3>{bank}</h3>
            <div className={style.middle}>
                <img src={chip_icon} />
                <img src={wifi_icon} />
            </div>
            <div className={style.bottom}>
                <div>
                    <div className={style.cardNumber}>{cardNumber}</div>
                    <div className={style.expireDate}>{expireDate}</div>
                </div>
                { network == "Visa" ? <img src={visa_icon}/> : <img src={mcard_icon}/> }
            </div>
        </div>
    )
}
export default CreditCard