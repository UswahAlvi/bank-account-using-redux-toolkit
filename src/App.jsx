import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import { useSelector } from "react-redux";
function App() {
  const fullName=useSelector((store)=>(store.customer.fullName))
  return (
      <>
        <h1>🏦 The React-Redux Bank </h1>
        {fullName===''?(<>
        <CreateCustomer />
        
        </>):
        (<>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
        </>)
        }
      </>
  );
}

export default App;
