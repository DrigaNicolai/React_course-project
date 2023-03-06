import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {IPost} from "../models";

interface PostFormProps {
  create: (post: IPost) => void
}
const PostForm = ({create}: PostFormProps) => {
  const [post, setPost] = useState({ title: "" as string, body: "" as string })

  const changeTitle = (e: { target: { value: string; }; }) => {
    setPost({...post, title: e.target.value})
  }

  const changeBody = (e: { target: { value: string; }; }) => {
    setPost({...post, body: e.target.value})
  }

  const addNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now()
    }
    create(newPost);
    setPost({ title: "", body: "" });
  }

  return (
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
  );
};

export default PostForm;
