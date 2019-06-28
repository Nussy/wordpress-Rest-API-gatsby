import React from "react"
import { graphql } from 'gatsby'
import PostsList from "../../components/postsList";

export default (props) => {
  return (
    <PostsList
      title="Posts with fragments"
      data={props.data.allWordpressPost}
    />
  )
}

export const query = graphql`
  query {
    allWordpressPost {
      ...allPosts
    }
  }
`