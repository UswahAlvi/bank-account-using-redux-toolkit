import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./AccountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const dispatch = useDispatch();
  const { loan: currentLoanAmount, loanPurpose: currentLoanPurpose } = useSelector((store) => store.account);

  function handleDeposit() {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    dispatch(deposit(amount, currency));
    setDepositAmount('');
  }

  function handleWithdrawal() {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) return;
    dispatch(withdraw(amount));
    setWithdrawalAmount('');
  }

  function handleRequestLoan() {
    const amount = parseFloat(loanAmount);
    if (amount <= 0 || loanPurpose === '') return;
    dispatch(requestLoan(amount, loanPurpose));
    setLoanAmount('');
    setLoanPurpose('');
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your Account Operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          <button onClick={handleDeposit}>Deposit Amount</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            placeholder="Amount"
          />
          <button onClick={handleWithdrawal}>Withdraw Amount</button>
        </div>

        

        {currentLoanAmount > 0 ?
        (
          <div>
            <span>Pay back {currentLoanAmount} ({currentLoanPurpose})</span>
            <button onClick={handlePayLoan}>Pay Loan</button>
          </div>
        ):
        (<div>
          <label>Request Loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request Loan</button>
        </div>)
        }
      </div>
    </div>
  );
}

export default AccountOperations;
