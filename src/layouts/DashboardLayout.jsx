import StickyHeader from "../components/StickyHeader"
import style from "./DashboardLayout.module.scss"
import { Toaster } from 'react-hot-toast'
import Logo from "../components/Logo"
import HeaderLine from "../components/HeaderLine"
import {useState} from "react"
import Nav from "../components/Nav"

// Icons
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
                <Nav />
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