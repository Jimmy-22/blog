import React, { useCallback } from "react";

export default function App() {
  console.log("App执行了");
  const [n, setN] = React.useState(0);
  const [m, setM] = React.useState(0);
  const onClick = () => {
    setN(n + 1);
  };
  const onClickChild = useCallback(() => {}, [m]);

  return (
    <div className="App">
      <div>
        <button onClick={onClick}>update n {n}</button>
      </div>
      <Child2 data={m} onClick={onClickChild} />
      {/* <Child data={m} /> */}
    </div>
  );
}

function Child(props) {
  console.log("child执行了");
  console.log("假设这里有大量代码");
  return <div onClick={props.onClick}>child: {props.data}</div>;
}

const Child2 = React.memo(Child);
