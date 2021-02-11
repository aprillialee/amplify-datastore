export const listPosts = `query ListPosts {
  listPosts {
    items {
      id
      title
      comments {
        items {
          id
          postID
          content
        }
      }
    }
  }
}
`;
