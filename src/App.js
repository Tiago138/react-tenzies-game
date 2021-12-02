import { useState } from "react";
import { nanoid } from "nanoid";

import Die from "./Die";

function App() {
  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDiceArray;
  }

  const [diceArray, setDiceArray] = useState(allNewDice);
  const diceElements = diceArray.map(dice => (
    <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} />
  ));

  function rollDice() {
    setDiceArray(allNewDice);
  }

  return (
    <main className="main">
      <div className="text">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="die--container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
