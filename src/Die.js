function Die(props) {
  return (
    <div className={`die ${props.isHeld ? "greenDice" : ""}`}>
      {props.value}
    </div>
  );
}

export default Die;
