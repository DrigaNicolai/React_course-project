import React, {useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";

function App() {
  const [value, setValue] = useState("Input text");

  return (
    <div className="App">
      {/*<h1>Function created component</h1>*/}
      {/*<Counter />*/}
      {/*<h1>Class created component</h1>*/}
      {/*<ClassCounter />*/}
      <div className="post">
        <div className="post__content">
          <strong>1. Javascript</strong>
          <div>
            Some description
          </div>
        </div>
        <div className="post__btns">
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
