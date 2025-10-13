import style from "./Chart.module.scss"
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

const Chart = ({title,pLabel,uLabel,data={pData:[5000],uData:[2500],xLabels:["Label"]}}) => {
    return(
        <div className={style.chart}>
            <h2>{title}</h2>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[
                    { data: data.pData, label: pLabel },
                    { data: data.uData, label: uLabel },
                    ]}
                    xAxis={[{ scaleType: 'point', data: data.xLabels }]}
                    yAxis={[{ width: 50 }]}
                    margin={{ right:24 }}
                    colors={["#29A073","#C8EE44"]}
                />
            </Box>
        </div>
    )
}
export default Chart