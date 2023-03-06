import React, {useRef, useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "Description for js"},
    { id: 2, title: "Typescript", body: "Description for ts"},
    {
      id: 3,
      title: "React",
      body: "Description for react"
    }
  ]);
  // const [title, setTitle] = useState("");
  // const bodyInputRef = useRef();
  // const [body, setBody] = useState("");
  const [post, setPost] = useState({ title: "" as string, body: "" as string });

  const addNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    // // @ts-ignore
    // console.log(bodyInputRef.current.value);
    setPosts([...posts, {...post, id: Date.now()}]);
    setPost({ title: "", body: "" });
  }

  const changeTitle = (e: { target: { value: string; }; }) => {
    setPost({...post, title: e.target.value})
  }

  const changeBody = (e: { target: { value: string; }; }) => {
    setPost({...post, body: e.target.value})
  }


  // @ts-ignore
  return (
    <div className="App">
      {/*<h1>Function created component</h1>*/}
      {/*<Counter />*/}
      {/*<h1>Class created component</h1>*/}
      {/*<ClassCounter />*/}
      <form>
        <MyInput
          type="text"
          placeholder="Post title"
          value={post.title}
          onChange={changeTitle}
        />
        {/*Uncontrolled component*/}
        {/*<MyInput
          ref={bodyInputRef}
          type="text"
          placeholder="Post description"
        />*/}
        <MyInput
          type="text"
          placeholder="Post body"
          value={post.body}
          onChange={changeBody}
        />
        <MyButton onClick={addNewPost}>Create</MyButton>
      </form>
      <PostList
        posts={posts}
        title={"List of posts 1"}
      />
    </div>
  );
}

export default App;
