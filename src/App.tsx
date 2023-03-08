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
import {useFetching} from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";

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
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);

    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    console.log("useEffect hook");
    // @ts-ignore
    fetchPosts();
  }, []);

  const createPost = (newPost: IPost): void => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post: IPost): void => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  const changePage = (page: number) => {
    setPage(page);
    fetchPosts()
  }

  return (
    <div className="App">
      {/*<h1>Function created component</h1>*/}
      {/*<Counter />*/}
      {/*<h1>Class created component</h1>*/}
      {/*<ClassCounter />*/}
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
      { postError &&
        <h1>
          Error happened: ${postError}
        </h1>
      }
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
      <div className="page__wrapper">
        { pagesArray.map(p =>
            <span
              key={p}
              className={page === p ? "page page__current" : "page"}
              onClick={() => changePage(p)}
            >
              {p}
            </span>
          )
        }
      </div>
    </div>
  );
}

export default App;
