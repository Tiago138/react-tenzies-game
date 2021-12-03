function Die(props) {
  return (
    <div
      className={`die ${props.isHeld ? "greenDice" : ""}`}
      onClick={props.handleClick}>
      {props.value}
    </div>
  );
}

export default Die;
