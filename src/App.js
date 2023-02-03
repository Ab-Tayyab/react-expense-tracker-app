import Context from './component/context/Context';
import ExpenseTracker from './component/expense_Tracker/ExpenseTracker';

function App() {
  return (
    <div className="App">
      <Context>
        <ExpenseTracker />
      </Context>
    </div>
  );
}

export default App;
