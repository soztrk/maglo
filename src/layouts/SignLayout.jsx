import style from "./SignLayout.module.scss"

const SignLayout = ({children}) => 
{
    return (
        <main className={style.signLayout}>
            <img src="/img/maglo_logo.svg" alt="maglo logo" />
            {children}
        </main>
    )
}

export default SignLayout