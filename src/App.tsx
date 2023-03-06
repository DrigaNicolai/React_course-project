import React, {useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {
  const [value, setValue] = useState("Input text");

  return (
    <div className="App">
      <Counter /> {/* function created component */}
      <ClassCounter /> {/* class created component */}
    </div>
  );
}

export default App;
