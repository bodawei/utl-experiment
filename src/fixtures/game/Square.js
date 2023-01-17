function Square(props) {
    return (
      <button className="square" onClick={props.onClick} data-testid={props.rowCol}>
        {props.value}
      </button>
    );
  }
  
  export { Square }