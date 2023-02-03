import Context from './component/context/Context';
// import ExpenseTrackerApp from './component/expense_Tracker/ExpenseTracker';
import ExpenseTracker1 from './component/expense_Tracker/ExpenseTracker1';

function App() {
  return (
    <div className="App">
      <Context>
        {/* <ExpenseTrackerApp /> */}
        <ExpenseTracker1 />
      </Context>
    </div>
  );
}

export default App;
