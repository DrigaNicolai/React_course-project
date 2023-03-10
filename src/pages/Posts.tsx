import React, {useEffect, useRef, useState} from 'react';
/*import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";*/
import "../styles/App.css";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import {IPost} from "../models";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";

const Posts = () => {
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
  const lastElement = useRef(null)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit: number, page: number) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);

    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    console.log("useEffect hook");
    // @ts-ignore
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost: IPost): void => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post: IPost): void => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  const changePage = (page: number) => {
    setPage(page);
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
      <PostList
        posts={sortedAndSearchedPosts}
        title={"List of posts 1"}
        remove={removePost}
      />
      <div
        ref={lastElement}
        style={ { height: 20, background: "red" } }
      />
      { isPostsLoading
        &&
        <div style={ { display: "flex", justifyContent: "center", marginTop: 50 } }>
          <Loader />
        </div>
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
