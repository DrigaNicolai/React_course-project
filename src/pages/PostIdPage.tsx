import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({} as any);
  const [comments, setComments] = useState([] as Array<any>);
  const [fetchPostById, isLoading, error] = useFetching(async (id: number) => {
    const response = await PostService.getByID(id);

    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id: number) => {
    const response = await PostService.getCommentsByPostID(id);

    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(Number(params.id));
    fetchComments(Number(params.id));
  }, []);

  return (
    <div>
      <h1>Post's page with id = {params.id}</h1>
      { isLoading
        ?
          <Loader />
        :
          <div>{post.id}. {post.title}</div>
      }
      <h1>
        Comments
      </h1>
      { isComLoading
        ?
          <Loader />
        :
          <div>
            { comments.map(comm =>
                <div key={comm.id} style={ { marginTop: 15 } }>
                  <h5>{comm.email}</h5>
                  <div>{comm.body}</div>
                </div>
              )
            }
          </div>
      }
    </div>
  );
};

export default PostIdPage;
