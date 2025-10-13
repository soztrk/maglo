import style from "./SignLayout.module.scss"
import { Toaster } from 'react-hot-toast'
import Logo from "../components/Logo"

const SignLayout = ({children}) => {
    return (
        <main className={style.signLayout}>
            <section className={style.formSection}>
                <Logo />
                <div className={style.signFormContainer}>
                    {children}
                </div>
            </section>
            <section className={style.imageSection}>
                <div className={style.coverImage}>
                    <div>
                        <img src="/img/sign_image.png" alt="Sign Image" />
                    </div>
                </div>
            </section>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
                />
        </main>
    )
}

export default SignLayout