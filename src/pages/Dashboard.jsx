import DashboardLayout from "../layouts/DashboardLayout"
import Card from "../components/Card"
import Chart from "../components/Chart"
import DataTable from "../components/DataTable"
import SimpleBar from "../components/SimpleBar"
import HeaderLine from "../components/HeaderLine"
import CreditCard from "../components/CreditCard"
import useFetch from "../hooks/useFetch"
import {useState,useEffect,useContext} from "react"
import { getAccessToken } from "../system/auth"
import currency from "currency.js"
import moment from "moment"
import toast from 'react-hot-toast'
import { ShimmerCategoryItem } from "react-shimmer-effects"
import UserContext from "../context/userContext"


// Icon Images
import wallet_green_icon from "../assets/img/wallet_green_icon.svg"
import wallet_saved_icon from "../assets/img/wallet_saved_icon.svg"
import wallet_spend_icon from "../assets/img/wallet_spend_icon.svg"

const Dashboard = () => {

    const [summary,setSummary] = useState()
    const [workingCapital,setWorkingCapital] = useState()
    const [recentTransactions,setRecentTransactions] = useState()
    const [scheduledTransfers,setScheduledTransfers] = useState()
    const [wallet,setWallet] = useState([0,1])

    const {user,setUser} = useContext(UserContext)

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

    const {
        sendRequest:userRequest
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
                            result.pData.push(val.income)
                            result.uData.push(val.expense)
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

        // Wallet
        walletRequest(
                {
                    url:`https://case.nodelabs.dev/api/financial/wallet`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){
                        setWallet(response.data.cards.slice(0,2))
                        toast.success(response.message)
                    }
                    else{
                        toast.error(response.message)
                    }
                }
            )
        
        // User
        if(!user){
            userRequest(
                {
                    url:`https://case.nodelabs.dev/api/users/profile`,
                    method:"GET",
                    apiKey:getAccessToken(),
                },
                response=>{

                    if(response.success){
                        setUser(response.data)
                    }
                }
            )
        }

    },[])

    return (
        <DashboardLayout
            userName={user?.fullName} 
            cards={
                <>
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_green_icon}
                        title="Total Balance"
                        amount={summary?.totalBalance.amount}
                        currency={summary?.totalBalance.currency}
                        theme="dark"
                    />
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_spend_icon}
                        title="Total Spending"
                        amount={summary?.totalExpense.amount}
                        currency={summary?.totalExpense.currency}
                    />
                    <Card
                        loading={summaryLoading} 
                        icon={wallet_saved_icon}
                        title="Total Saved"
                        amount={summary?.totalSavings.amount}
                        currency={summary?.totalExpense.currency}
                    />
                </>
             }
             chart={
                <Chart
                    loading={workingCapitalLoading}
                    title="Working Capital"
                    pLabel="Income"
                    uLabel="Expenses"
                    data={workingCapital} 
                />
             }
             recentTransaction={
                <DataTable
                loading={recentTransactionsLoading} 
                title="Recent Transactions"
                data={recentTransactions}
                />
             }
             wallet={
                wallet &&
                <>
                    <CreditCard
                        key={wallet[0]?.id}
                        loading={walletLoading} 
                        bank={wallet[0]?.bank}
                        cardNumber= {wallet[0]?.cardNumber}
                        expireDate={wallet[0]?.expiryMonth+"/"+wallet[0]?.expiryYear}
                        network={wallet[0]?.network}
                        theme="dark"
                    />
                    <CreditCard
                        key={wallet[1]?.id}
                        loading={walletLoading} 
                        bank={wallet[1]?.bank}
                        cardNumber= {wallet[1]?.cardNumber}
                        expireDate={wallet[1]?.expiryMonth+"/"+wallet[1]?.expiryYear}
                        network={wallet[1]?.network}
                        theme="transparent"
                    />
                </>
                
             }
             scheduledTransfers={

                scheduledTransformsLoading ?

                <>
                    {
                        ["sht1","sht2","sht3"].map((val)=>(
                            <ShimmerCategoryItem
                            key={val}
                            hasImage
                            imageType="circular"
                            imageWidth={33}
                            imageHeight={33}
                            title
                            />
                        ))
                    }
                </>
                    :
                <>
                    <HeaderLine title="Scheduled Transfers" />
                    <div>
                        { 
                            scheduledTransfers?.map(value=>(
                            <SimpleBar
                                key={value.id}
                                image={value.image}
                                name={value.name}
                                date={moment(value.date).format('MMMM Do YYYY, h:mm:ss a')}
                                amount={currency(value.amount,{
                                                            symbol:value.currency,
                                                            pattern:`# !`,
                                                            negativePattern: `-# !`
                                                        }).format()}
                                
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