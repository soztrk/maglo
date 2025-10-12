import style from "./HeaderGroup.module.scss"

const HeaderGroup = ({title,subTitle}) => {
    return(
        <div className={style.headerGroup}>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
        </div>
    )
}
export default HeaderGroup