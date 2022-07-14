
import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PieChart } from 'react-minimal-pie-chart';
import { useOutletContext } from "react-router-dom";




const MyExpenses = () => {
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(0);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [code, setCode] = useState();
  
  const lineWidth = 60;
  const [user, setUser] = useOutletContext();
  const arr = () => {
    let data = localStorage.getItem(`expense${user.id}`);
    if (data) return JSON.parse(localStorage.getItem(`expense${user.id}`));
    else return [];
  };
  const [list, setList] = useState(arr);
  // let newData = data.map((entry, i) => {
  //   if (hovered === i) {
  //     return {
  //       ...entry,
  //       color: 'grey',
  //     };
  //   }
  //   return entry;
  // });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      name: name,
      amount: amount,
    };
    if (name && amount) {
      setList([...list, newItem]);
     
      setName("");
      setAmount(0);
    }
  };

  React.useEffect(() => {
    // localStorage.setItem("expense", JSON.stringify(list));
    localStorage.setItem(`expense${user.id}`, JSON.stringify(list));
  }, [list]);

  const reducer = (accumulator, item) => {
    return (accumulator = accumulator + parseInt(item.amount));
  };

  const total = list.reduce(reducer, 0).toFixed(2);

  const deleteItem = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  return (
    <div>
      
      <br></br>
      <div style={{display:"flex",justifyContent:"center"}}>
      <h1 id="h1expense">My Expenses</h1>
      </div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{code}{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{code}{total}</p>
        </div>
      </div>
      <h4>Total Monthly Income:</h4>
      <input
        type="text"
        placeholder="Enter Your Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <br></br>
      <h4>Total Balance:{code}{income - total}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Item</label>
          <input
            type="text"
            placeholder="Enter Item"
            value={name}
            onChange={(e) => {
              if(e.target.value.length<=15)
              setName(e.target.value)
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              if(e.target.value.length<=10)
              setAmount(e.target.value)
            }}
          />
        </div>

        <button className="btnExpense">Add Expense</button>
      </form>
      <div className="list">
        {list.map((item, id) => {
          return (
            <div key={id}>
              <li className={item.amount>0 ? "plus": "minus"}>
                {item.name}
                <span>{code}{(item.amount)}</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="popUpButtonNo"
                > Delete
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            </div>
          );
        })}
      </div>

      
      {/* <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      radius={PieChart.defaultProps.radius - 30}
      lineWidth={60}
      animate
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
      data={[
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
      ]}
    />; */}

    </div>
  );
};

export default MyExpenses;