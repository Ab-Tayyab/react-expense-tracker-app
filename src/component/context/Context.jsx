import { createContext, useState } from 'react';

export let GlobalContext = createContext();
function ExpenseContext(props) {
  let [transection, setTransection] = useState([]);
  let [budget, setBudget] = useState([]);
  const getExpenseData = (item) => {
    setTransection([...transection, item])
  }
  const deletedata = (data) => {
    setTransection([...data])
  }

  const getBudgetData = (item) => {
    setBudget([item])

  }
  return (
    <GlobalContext.Provider value={{
      mytransection: transection, expenseData: getExpenseData, dltData: deletedata,
      budgetData: getBudgetData, myBudget:budget
    }}>
      <div className="main-container">
        {props.children}
      </div>
    </GlobalContext.Provider>
  );
}
export default ExpenseContext;