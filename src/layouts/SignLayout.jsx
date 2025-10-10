import style from "./SignLayout.module.scss"

const SignLayout = ({children}) => 
{
    return (
        <div className={style.signLayout}>
            <main>
                <section className={style.formSection}>
                    <div>
                        <div className={style.signLogo}>
                            <img src="/img/maglo_logo.svg" alt="Maglo Logo" />
                            <span>Maglo.</span>
                        </div>
                        <div className={style.signFormContainer}>
                            {children}
                        </div>
                    </div>
                </section>
                <section className={style.imageSection}>
                    <div className={style.coverImage}>
                        <div>
                            <img src="/img/sign_image.png" alt="Sign Image" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default SignLayout