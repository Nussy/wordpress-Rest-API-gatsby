import React from "react"
import { graphql } from 'gatsby'
import PostsList from "../../components/postsList";

export default (props) => {
  console.log("test" , props.data)
  return (
    <PostsList
      title="Posts skip 3 first"
      data={props.data.allWordpressPost}
    />
  )
}

export const query = graphql`
  query {
    allWordpressPost(skip: 3) {
      ...allPosts
    }
  }
`