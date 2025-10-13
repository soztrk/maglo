import DashboardLayout from "../layouts/DashboardLayout"
import Card from "../components/Card"
import Chart from "../components/Chart"
import DataTable from "../components/DataTable"
import SimpleBar from "../components/SimpleBar"
import HeaderLine from "../components/HeaderLine"
import CreditCard from "../components/CreditCard"

// Icon Images
import wallet_green_icon from "../assets/img/wallet_green_icon.svg"
import wallet_saved_icon from "../assets/img/wallet_saved_icon.svg"
import wallet_spend_icon from "../assets/img/wallet_spend_icon.svg"

const Dashboard = () => 
{
    return (
        <DashboardLayout 
            cards={
                <>
                    <Card 
                        icon={wallet_green_icon}
                        title="Total Balance"
                        amount="$5240.21"
                        theme="dark"
                    />
                    <Card 
                        icon={wallet_spend_icon}
                        title="Total Spending"
                        amount="$250.80"
                    />
                    <Card 
                        icon={wallet_saved_icon}
                        title="Total Saved"
                        amount="$550.25"
                    />
                </>
             }
             chart={
                <Chart
                    title="Working Capital"
                    pLabel="Income"
                    uLabel="Expenses" 
                />
             }
             recentTransaction={
                <DataTable 
                title="Recent Transactions"
                data={[{
                    id:"123456",
                    name: "iPhone 13 Pro MAX",
                    business: "Apple Inc.",
                    image: "https://i.ibb.co/Apple-Logo.png",
                    type: "Mobile",
                    amount: -420.84,
                    currency: "TRY",
                    date: "2025-10-06T10:30:00.000Z",
                    status: "completed"
                }]}
                />
             }
             wallet={
                <CreditCard 
                    bank="Maglo | Universal Bank"
                    cardNumber= "5495 7381 3759 2321"
                    expireDate="12/2027"
                    network="Visa"
                    color="#000000"
                />
             }
             scheduledTransfers={
                <>
                    <HeaderLine title="Scheduled Transfers" />
                    <div>
                        <SimpleBar
                            image="https://ui-avatars.com/api/?name=Saleh+Ahmed&background=random&size=100"
                            name="Saleh Ahmed"
                            date="2022-04-28T11:00:00Z"
                            amount="- $435.00"
                        />
                        <SimpleBar
                            image="https://ui-avatars.com/api/?name=Saleh+Ahmed&background=random&size=100"
                            name="Saleh Ahmed"
                            date="2022-04-28T11:00:00Z"
                            amount="- $435.00"
                        />
                    </div>
                </>
             }
        />
    )
}

export default Dashboard