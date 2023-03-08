import React, {useEffect, useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import {IPost} from "./models";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";

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
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();

    setPosts(posts);
    setIsPostsLoading(false);
  }

  const createPost = (newPost: IPost): void => {
    setPosts([...posts, newPost]);
    setModal(false);
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
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton
        style={ {marginTop: 30} }
        onClick={() => setModal(true)}
      >
        Create post
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <hr style={ {margin: "15px 0"} } />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      { isPostsLoading
        ?
          <div style={ { display: "flex", justifyContent: "center", marginTop: 50 } }>
            <Loader />
          </div>
        :
          <PostList
            posts={sortedAndSearchedPosts}
            title={"List of posts 1"}
            remove={removePost}
          />
      }


    </div>
  );
}

export default App;
