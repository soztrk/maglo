import {Link} from "react-router"
import style from "./SignLink.module.scss"

const SignLink = ({text,linkText,url}) => {

    return (
        <div className={style.signLink}>
            <p>{text}</p>
            <Link to={url}>{linkText}</Link>
        </div>
    )
}

export default SignLink