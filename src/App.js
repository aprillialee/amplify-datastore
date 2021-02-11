import React, { useState, useEffect } from "react";

import "./App.css";
import styled from "styled-components";

import { DataStore } from "@aws-amplify/datastore";
import { Post, Comment } from "./models";

import { listPosts } from "./graphql-custom/queries";

import { API, graphqlOperation } from "@aws-amplify/core";
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

const initialState = { title: "" };

const listPosts = async (limit = 10, nextToken = null) => {
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
};

function App() {
  const [postState, updatePostState] = useState(initialState);
  const [posts, updatePosts] = useState([]);

  const [id, setID] = useState("");

  useEffect(() => {
    fetchPosts();
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    listPosts();
    return () => subscription.unsubscribe();
  });

  function onChange(e) {
    updatePostState({ title: e.target.value });
  }

  async function deletePost(id) {
    const toDelete = await DataStore.query(Post, id);
    DataStore.delete(toDelete);
  }

  async function fetchPosts() {
    const posts = await DataStore.query(Post);
    updatePosts(posts);
  }

  async function createPost() {
    if (!postState.title) return;
    await DataStore.save(new Post({ ...postState }));
    updatePostState(initialState);
  }

  return (
    <div>
      <InputStyled onChange={onChange} name="title" value={postState.title} />
      <ButtonStyled onClick={createPost}>Create Post</ButtonStyled>
      {posts.map((post) => (
        <p key={post.id}>
          {post.title}
          <ButtonStyled
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Delete Post
          </ButtonStyled>
        </p>
      ))}
    </div>
  );
}

export default App;

const InputStyled = styled.input``;

const ButtonStyled = styled.button``;
