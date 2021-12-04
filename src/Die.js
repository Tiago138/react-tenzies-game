function Die(props) {
  const face1 = (
    <div className="first-face">
      <span className="pip"></span>
    </div>
  );

  const face2 = (
    <div className="second-face">
      <span className="pip"></span>
      <span className="pip"></span>
    </div>
  );

  const face3 = (
    <div className="third-face">
      <span className="pip"></span>
      <span className="pip"></span>
      <span className="pip"></span>
    </div>
  );

  const face4 = (
    <div className="fourth-face">
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
    </div>
  );

  const face5 = (
    <div className="fifth-face">
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
      <div className="column">
        <span className="pip"></span>
      </div>
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
    </div>
  );

  const face6 = (
    <div className="sixth-face">
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
      <div className="column">
        <span className="pip"></span>
        <span className="pip"></span>
        <span className="pip"></span>
      </div>
    </div>
  );

  const diceFaceArray = [face1, face2, face3, face4, face5, face6];

  return (
    <>
      <div
        className={`die ${props.isHeld ? "greenDice" : ""}`}
        onClick={props.handleClick}>
        {diceFaceArray[props.value - 1]}
      </div>
    </>
  );
}

export default Die;
