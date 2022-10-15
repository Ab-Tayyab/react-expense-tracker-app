import { createContext, useState } from 'react';

export let GlobalContext = createContext();
function Context(props) {
  let [transection, setTransection] = useState([]);
  const getData = (item) => {
    setTransection([...transection, item])
  }
  const deletedata = (data) => {
    setTransection([...data])
  }
  return (
    <GlobalContext.Provider value={{ mytransection: transection, userData: getData, dltData: deletedata }}>
      <div className="main-container">
        {props.children}
      </div>
    </GlobalContext.Provider>
  );
}
export default Context;