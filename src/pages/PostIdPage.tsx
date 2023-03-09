import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({} as any);
  const [fetchPostById, isLoading, error] = useFetching(async (id: number) => {
    const response = await PostService.getByID(id);

    setPost(response.data);
  });

  useEffect(() => {
    fetchPostById(Number(params.id));
  }, []);

  return (
    <div>
      <h1>Post's page with id = {params.id}</h1>
      {isLoading
        ?
          <Loader />
        :
          <div>{post.id}. {post.title}</div>
      }
    </div>
  );
};

export default PostIdPage;
