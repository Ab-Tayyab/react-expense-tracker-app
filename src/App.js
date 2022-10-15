import Context from './component/context/Context';
import ExpenseTrackerApp from './component/expense_Tracker/ExpenseTracker';

function App() {
  return (
    <div className="App">
      <Context>
      <ExpenseTrackerApp />
      </Context>
    </div>
  );
}

export default App;
