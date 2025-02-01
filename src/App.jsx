import { useEffect, useState } from "react";

import "./App.css";
// import { response } from 'express';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDesc] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = import.meta.env.VITE_API_URL + "/api/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(/*ev*/) {
    // ev.preventDefault();
    const url = import.meta.env.VITE_API_URL + "/api/transaction";

    const price = name.split(" ")[0];
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDesc("");
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);

  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <>
      <main>
        <h1>
          ₹{balance}
          <span>.{fraction}</span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder={"+200 new Samsung TV"}
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(ev) => setDatetime(ev.target.value)}
            />
          </div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDesc(ev.target.value)}
              placeholder={"Description"}
            />
          </div>
          <button type="submit">Add new Transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div
                className="transaction"
                key={transaction.id || transaction._id}
              >
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="desc">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={`price ${transaction.price < 0 ? "red" : "green"}`}
                  >
                    Rs. {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
