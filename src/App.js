import React, { useState, useEffect } from "react";

import "./App.css";
import styled from "styled-components";

import { DataStore } from "@aws-amplify/datastore";
import { Post, Comment } from "./models";

import { listPosts } from "./graphql-custom/queries";
import * as queries from "./graphql/queries";

import { API, graphqlOperation } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

const initialState = { title: "" };

function App() {
  const [posts, updatePosts] = useState([]);

  async function listAllPosts() {
    const allPostsData = await API.graphql({ query: queries.listPosts });
    const allPosts = allPostsData.data.listPosts.items;
    return allPosts;
  }

  useEffect(() => {
    let isSubscribed = true;
    listAllPosts().then((posts) => {
      if (isSubscribed) {
        updatePosts(posts);
      }
    });
    return () => (isSubscribed = false);
  }, []);
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

export default App;

const InputStyled = styled.input``;

const ButtonStyled = styled.button``;

/* const listAllPosts = async (limit = 10, nextToken = null) => {
  //Download all subjects.
  try {
    const allPostData = await API.graphql({
      query: listPosts,
      variables: {
        limit: limit,
        nextToken: nextToken,
      },
    });
    console.log(`****** allPosts: ${JSON.stringify(allPostData)}`);

    const allPosts = allPostData.data.listPosts.items;

    return allPosts;
  } catch (error) {
    console.log(`!!!!Error getting subjects!!: ${JSON.stringify(error)}`);
  }
}; */

/* async function listAllComments() {
  const allComments = await API.graphql({ query: queries.listComments });
  console.log(allComments);
} */

/*   const [posts, updatePosts] = useState([]); */
/* const [postState, updatePostState] = useState(initialState); 


  const [id, setID] = useState("");

  useEffect(() => {
    fetchPosts();
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    return () => subscription.unsubscribe();
  });

  function onChange(e) {
    updatePostState({ title: e.target.value });
  } */

/*   async function deletePost(id) {
    const toDelete = await DataStore.query(Post, id);
    DataStore.delete(toDelete);
  }
  */

/* async function fetchPosts() {
    const posts = await DataStore.query(Post);
    updatePosts(posts);
  } */

/*   async function createPost() {
    if (!postState.title) return;
    await DataStore.save(new Post({ ...postState }));
    updatePostState(initialState);
  } */

/*

 <InputStyled onChange={onChange} name="title" value={postState.title} />
      <ButtonStyled onClick={createPost}>Create Post</ButtonStyled> 
         <ButtonStyled
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Delete Post
          </ButtonStyled> 

          */
