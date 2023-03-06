import React, {useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import {IPost} from "./models";

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

  const createPost = (newPost: IPost): void => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post: IPost): void => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  return (
    <div className="App">
      {/*<h1>Function created component</h1>*/}
      {/*<Counter />*/}
      {/*<h1>Class created component</h1>*/}
      {/*<ClassCounter />*/}
      <PostForm create={createPost} />
      { posts.length
        ?
          <PostList
            posts={posts}
            title={"List of posts 1"}
            remove={removePost}
          />
        :
          <h1 style={ { textAlign: "center" } }>
            No posts available!
          </h1>
      }

    </div>
  );
}

export default App;
