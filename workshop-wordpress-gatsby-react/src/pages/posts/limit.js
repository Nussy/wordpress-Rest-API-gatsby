import React from "react"
import { graphql } from 'gatsby'
import PostsList from "../../components/postsList";

export default (props) => {
  console.log("test" , props.data)
  return (
    <PostsList
      title="Posts limit by 3"
      data={props.data.allWordpressPost}
    />
  )
}

export const query = graphql`
  query {
    allWordpressPost(limit: 3) {
      ...allPosts
    }
  }
`