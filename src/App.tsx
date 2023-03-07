import React, {useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import {IPost} from "./models";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

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
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getSortedPosts = () => {
    if (selectedSort) {
      return [...posts].sort((a: any, b: any) => a[selectedSort].localeCompare(b[selectedSort]));
    }

    return posts;
  }

  const sortedPosts = getSortedPosts();

  const createPost = (newPost: IPost): void => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post: IPost): void => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
  }

  const handleChangeSearchQuery = (e: any) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="App">
      {/*<h1>Function created component</h1>*/}
      {/*<Counter />*/}
      {/*<h1>Class created component</h1>*/}
      {/*<ClassCounter />*/}
      <PostForm create={createPost} />
      <hr style={ {margin: "15px 0"} } />
      <div>
        <MyInput
          value={searchQuery}
          placeholder="Search"
          onChange={handleChangeSearchQuery}
        />
        <MySelect
          value={selectedSort}
          defaultValue="Sort"
          options={[
            { value: "title", name: "By title" },
            { value: "body", name: "By body" },
          ]}
          onChange={sortPosts}
        />
      </div>
      { posts.length
        ?
          <PostList
            posts={sortedPosts}
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
