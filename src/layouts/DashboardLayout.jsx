import StickyHeader from "../components/StickyHeader"
import style from "./DashboardLayout.module.scss"
import { Toaster } from 'react-hot-toast'
import Logo from "../components/Logo"
import HeaderLine from "../components/HeaderLine"
import {useState} from "react"

// Icons
import help_icon from "../assets/img/help_icon.svg"
import home_icon from "../assets/img/home_icon.svg"
import invoice_icon from "../assets/img/invoice_icon.svg"
import logout_icon from "../assets/img/logout_icon.svg"
import settings_icon from "../assets/img/settings_icon.svg"
import trans_icon from "../assets/img/trans_icon.svg"
import wallet_icon from "../assets/img/wallet_icon.svg"
import bell_icon from "../assets/img/bell_icon.svg"
import search_icon from "../assets/img/search_icon.svg"
import dropdown_icon from "../assets/img/dropdown_icon.svg"
import menu_icon from "../assets/img/menu_icon.svg"

// Dummy Avatar
import avatar from "../assets/img/avatar.png"

const DashboardLayout = ({header={absolute:false,sticky:true,offest:100},cards,chart,recentTransaction,wallet,scheduledTransfers}) => {

    const [mobileNavActive,setMobileNavActive] = useState(false)

    const handleMobileNav = () => {
        setMobileNavActive(!mobileNavActive)
    }

    return (
        <div className={style.dashboardLayout}>
            <aside className={mobileNavActive?style.active:""}>
                <Logo />
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
                            <a href="#">
                                <img src={logout_icon} />
                                <span>Loguot</span>
                            </a>
                        </li>
                    </nav>
                </div>
            </aside>
            <div className={style.content}>
                <StickyHeader
                absolutePosition={header.absolute} 
                stickyEnabled={header.sticky} 
                offset={header.offest}>
                    <div className={style.topBar}>
                        <div className={style.barLeft}>
                            <h1>Dashboard</h1>
                        </div>
                        <div className={style.barRight}>
                            <div>
                                <img src={search_icon} />
                            </div>
                            <div>
                                <img src={bell_icon} />
                            </div>
                            <div className={style.userDropdown}>
                                <div>
                                    <img src={avatar} />
                                </div>
                                <span>Mahfuzul Nabil</span>
                                <img src={dropdown_icon} />
                            </div>
                            <button className={style.mobileNavButton} onClick={handleMobileNav}>
                                <img src={menu_icon} />
                            </button>
                        </div>
                    </div>
                </StickyHeader>
                <main>
                    <div className={style.centerBlock}>
                        <section className={style.cards}>
                            {cards}
                        </section>
                        <section className={style.chart}>
                            {chart}
                        </section>
                        <section className={style.transations}>
                            {recentTransaction}
                        </section>
                    </div>
                    <div className={style.rightBlock}>
                        <section className={style.wallet}>
                            <HeaderLine title="Wallet" more={true} />
                            {wallet}
                        </section>
                        <section className={style.shtrans}>
                            {scheduledTransfers}
                        </section>
                    </div>
                </main>
            </div>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
                />
        </div>
    )
}

export default DashboardLayout