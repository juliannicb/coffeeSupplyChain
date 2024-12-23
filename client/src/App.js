import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CoffeeSupplyChain from "./abi/CoffeeSupplyChain.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoffeeSupplyChain.networks[networkId];
      const instance = new web3.eth.Contract(
        CoffeeSupplyChain.abi,
        deployedNetwork && deployedNetwork.address
      );

      setContract(instance);
    };

    init();
  }, []);

  const addCoffee = async () => {
    const origin = prompt("Enter origin:");
    const description = prompt("Enter description:");
    await contract.methods.addCoffee(origin, description).send({ from: account });
    alert("Coffee added!");
  };

  const getCoffees = async () => {
    const coffeeCount = await contract.methods.coffeeCount().call();
    const coffeeList = [];
    for (let i = 1; i <= coffeeCount; i++) {
      const coffee = await contract.methods.coffees(i).call();
      coffeeList.push(coffee);
    }
    setCoffees(coffeeList);
  };

  return (
    <div>
      <h1>Coffee Supply Chain</h1>
      <button onClick={addCoffee}>Add Coffee</button>
      <button onClick={getCoffees}>View Coffees</button>
      <ul>
        {coffees.map((coffee, index) => (
          <li key={index}>
            {coffee.description} from {coffee.origin} (State: {coffee.state})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
