import DashboardLayout from "../layouts/DashboardLayout"
import Card from "../components/Card"
import Chart from "../components/Chart"
import DataTable from "../components/DataTable"
import SimpleBar from "../components/SimpleBar"
import HeaderLine from "../components/HeaderLine"
import CreditCard from "../components/CreditCard"
import useFetch from "../hooks/useFetch"
import {useState,useEffect} from "react"
import { getAccessToken } from "../helpers/auth"
import currency from "currency.js"
import moment from "moment"
import toast from 'react-hot-toast'


// Icon Images
import wallet_green_icon from "../assets/img/wallet_green_icon.svg"
import wallet_saved_icon from "../assets/img/wallet_saved_icon.svg"
import wallet_spend_icon from "../assets/img/wallet_spend_icon.svg"

const Dashboard = () => {

    const [summary,setSummary] = useState()
    const [workingCapital,setWorkingCapital] = useState()
    const [recentTransactions,setRecentTransactions] = useState()
    const [scheduledTransfers,setScheduledTransfers] = useState()
    const [wallet,setWallet] = useState()

    const {
        loading:summaryLoading,
        sendRequest:summaryRequest
    } = useFetch()

    const {
        loading:workingCapitalLoading,
        sendRequest:workingCapitalRequest
    } = useFetch()

    const {
        loading:recentTransactionsLoading,
        sendRequest:recentTransactionsRequest
    } = useFetch()

    const {
        loading:scheduledTransformsLoading,
        sendRequest:scheduledTransfersRequest
    } = useFetch()

    const {
        loading:walletLoading,
        sendRequest:walletRequest
    } = useFetch()

    useEffect(()=>{
        
        // Summary
        summaryRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/summary`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{
                    if(response.success){
                        setSummary(response.data)
                        toast.success(response.message)
                    }
                    else{
                        toast.error(response.message)
                    }
                }
            )

        // Working Capital
        workingCapitalRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/working-capital
`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){

                        let result = {pData:[],uData:[],xLabels:[],currency:response.data.currency}
                        
                        response.data.data.forEach(val=>{
                            result.pData.push(currency(val.income))
                            result.uData.push(currency(val.expense))
                            result.xLabels.push(val.month)
                        })

                        setWorkingCapital(result)
                        toast.success(response.message)
                    }
                    else{
                        toast.error(response.message)
                    }
                }
            )
        
        // Recent Transactions
        recentTransactionsRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/transactions/recent`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){
                        setRecentTransactions(response.data.transactions)
                        toast.success(response.message)
                    }
                    else{
                        toast.error(response.message)
                    }
                }
            )
        
        // Scheduled TRansaction
        scheduledTransfersRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/transfers/scheduled`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){
                        setScheduledTransfers(response.data.transfers)
                        toast.success(response.message)
                    }
                    else{
                        toast.error(response.message)
                    }
                }
            )

        // Scheduled TRansaction
        walletRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/wallet`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){
                        setWallet(response.data.cards[0])
                        //toast.success(response.message)
                    }
                    else{
                        //toast.error(response.message)
                    }
                }
            )

    },[])

    return (
        <DashboardLayout 
            cards={
                <>
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_green_icon}
                        title="Total Balance"
                        amount={ summary ? currency(summary.totalBalance.amount)+" "+summary.totalBalance.currency : ""}
                        theme="dark"
                    />
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_spend_icon}
                        title="Total Spending"
                        amount={ summary ? currency(summary.totalExpense.amount)+" "+summary.totalExpense.currency : ""}
                    />
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_saved_icon}
                        title="Total Saved"
                        amount={ summary ? currency(summary.totalSavings.amount)+" "+summary.totalSavings.currency : ""}
                    />
                </>
             }
             chart={
                <Chart
                    title="Working Capital"
                    pLabel="Income"
                    uLabel="Expenses"
                    data={workingCapital} 
                />
             }
             recentTransaction={
                <DataTable 
                title="Recent Transactions"
                data={recentTransactions}
                />
             }
             wallet={
                wallet &&
                <>
                    <CreditCard 
                        bank={wallet.bank}
                        cardNumber= {wallet.cardNumber}
                        expireDate={wallet.expiryMonth+"/"+wallet.expiryYear}
                        network={wallet.network}
                        color={wallet.color}
                    />
                </>
                
             }
             scheduledTransfers={
                <>
                    <HeaderLine title="Scheduled Transfers" />
                    <div>
                        { 
                            scheduledTransfers && scheduledTransfers.map(val=>(
                                <SimpleBar
                                    key={val.id}
                                    image={val.image}
                                    name={val.name}
                                    date={moment(val.date).format('Do MMMM YYYY, h:mm:ss a')} // human readable date format
                                    amount={currency(val.amount)+" "+val.currency}
                                />
                            ))
                        }
                    </div>
                </>
             }
        />
    )
}

export default Dashboard