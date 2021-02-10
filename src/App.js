import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

import { DataStore } from "@aws-amplify/datastore";
import { Post } from "./models";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

const initialState = { title: "" };

function App() {
  const [postState, updatePostState] = useState(initialState);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    return () => subscription.unsubscribe();
  });

  function onChange(e) {
    updatePostState({ title: e.target.value });
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
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

export default App;

const InputStyled = styled.input``;

const ButtonStyled = styled.button``;
