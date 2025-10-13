import style from "./DataTable.module.scss"
import HeaderLine from "./HeaderLine"
import currency from "currency.js"
import moment from "moment"

const DataTable = ({title,data}) => {
    return(
        <div className={style.dataTable}>
            <HeaderLine title={title} />
            <table>
                <thead>
                    <tr>
                        <th>NAME/BUSINESS</th>
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((value)=>(
                            <tr key={value.id}>
                                <td>
                                    <div className={style.name}>
                                        <img src={value.image} />
                                        <div>
                                            <h5>{value.name}</h5>
                                            <p>{value.business}</p>
                                        </div>
                                    </div>
                                    
                                </td>
                                <td>
                                    <span className={style.grayText}>{value.type}</span>
                                </td>
                                <td>
                                    <span className={style.darkText}>{currency(value.amount)+" "+value.currency}</span>
                                </td>
                                <td>
                                    <span className={style.grayText}>{moment(value.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default DataTable