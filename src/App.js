import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import Die from "./Die";

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(
    generateNewNumberOfRolls()
  );
  const [bestRoll, setBestRoll] = useState(
    () =>
      (localStorage.getItem("tenzies") &&
        JSON.parse(localStorage.getItem("tenzies"))) ||
      false
  );

  useEffect(() => {
    localStorage.setItem("tenzies", JSON.stringify(bestRoll));
  }, [bestRoll]);

  useEffect(() => {
    let die;

    diceArray.forEach(item => {
      if (item.isHeld === true) {
        die = item.value;
      }
    });

    const isAllHeld = diceArray.every(item => item.isHeld === true);
    const isDiceEqual = diceArray.every(item => item.value === die);

    if (isAllHeld && isDiceEqual) {
      setTenzies(true);
      setNumberOfRolls(prevNumberOfRolls => ({
        ...prevNumberOfRolls,
        time: Date.now() - prevNumberOfRolls.time,
      }));
    }
  }, [diceArray]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateNewNumberOfRolls() {
    return {
      rolls: 1,
      time: Date.now(),
    };
  }

  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push(generateNewDie());
    }
    return newDiceArray;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDiceArray(allNewDice());
      setNumberOfRolls(generateNewNumberOfRolls());
      setBestRoll(prevBestRoll =>
        prevBestRoll.rolls < numberOfRolls.rolls ? prevBestRoll : numberOfRolls
      );
    } else {
      setDiceArray(prevDiceArray =>
        prevDiceArray.map(dice =>
          dice.isHeld === true ? dice : generateNewDie()
        )
      );
      setNumberOfRolls(prevNumberOfRolls => ({
        ...prevNumberOfRolls,
        rolls: prevNumberOfRolls.rolls + 1,
      }));
    }
  }

  function holdDice(diceId) {
    setDiceArray(prevDiceArray =>
      prevDiceArray.map(dice =>
        dice.id === diceId ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = diceArray.map(dice => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      handleClick={() => holdDice(dice.id)}
    />
  ));

  const time = new Date(bestRoll.time);

  return (
    <>
      {tenzies && <Confetti />}
      <main className="main">
        <div className="info">
          <p>
            Roll{numberOfRolls.rolls > 1 && "s"}: {numberOfRolls.rolls}
          </p>
          {bestRoll.rolls && (
            <p>
              Best Roll: {bestRoll.rolls} Time:{" "}
              {`${time.getMinutes()}:${time.getSeconds()}`}
            </p>
          )}
        </div>
        <div className="text">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="die--container">{diceElements}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </>
  );
}

export default App;
