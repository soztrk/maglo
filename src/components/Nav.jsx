import style from "./Nav.module.scss"
import { clearAccessToken } from "../system/auth"
import {useNavigate} from "react-router"

// Icons
import help_icon from "../assets/img/help_icon.svg"
import home_icon from "../assets/img/home_icon.svg"
import invoice_icon from "../assets/img/invoice_icon.svg"
import logout_icon from "../assets/img/logout_icon.svg"
import settings_icon from "../assets/img/settings_icon.svg"
import trans_icon from "../assets/img/trans_icon.svg"
import wallet_icon from "../assets/img/wallet_icon.svg"

const Nav = () => {

    let navigate = useNavigate()

    const handleLogoutClick = () => {
        clearAccessToken()
        navigate("/")
    }

    return(
        <div className={style.navigation}>
            <nav className={style.navTop}>
                <li>
                    <a href="#" className={style.active}>
                        <img src={home_icon} />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={trans_icon} />
                        <span>Transactions</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={invoice_icon} />
                        <span>Invoices</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={wallet_icon} />
                        <span>My Wallets</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={settings_icon} />
                        <span>Settings</span>
                    </a>
                </li>
            </nav>
            <nav className={style.navBottom}>
                <li>
                    <a href="#">
                        <img src={help_icon} />
                        <span>Help</span>
                    </a>
                </li>
                <li>
                    <button onClick={handleLogoutClick}>
                        <img src={logout_icon} />
                        <span>Loguot</span>
                    </button>
                </li>
            </nav>
        </div>
    )
}
export default Nav