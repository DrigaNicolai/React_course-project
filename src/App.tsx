import React, {useMemo, useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import {IPost} from "./models";
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "Description for js"},
    { id: 2, title: "Typescript", body: "Description for ts"},
    {
      id: 3,
      title: "React",
      body: "Description for react"
    },
    {
      id: 4,
      title: "Python",
      body: "Python description"
    }
  ]);
  // const [title, setTitle] = useState("");
  // const bodyInputRef = useRef();
  // const [body, setBody] = useState("");
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const sortedPosts = useMemo(() => {
    console.log("Sorted posts function works")
    if (filter.sort) {
      return [...posts].sort((a: any, b: any) => a[filter.sort].localeCompare(b[filter.sort]));
    }

    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
  }, [filter.query, sortedPosts]);

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
      <hr style={ {margin: "15px 0"} } />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList
        posts={sortedAndSearchedPosts}
        title={"List of posts 1"}
        remove={removePost}
      />

    </div>
  );
}

export default App;
