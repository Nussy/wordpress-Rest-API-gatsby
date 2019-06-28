import React from "react"
import { graphql } from 'gatsby'
import PostsList from "../../components/postsList";

export default (props) => {
  console.log("test" , props.data)
  return (
    <PostsList
      title="Posts sort by DESC according title field"
      data={props.data.allWordpressPost}
    />
  )
}

export const query = graphql`
  query {
    allWordpressPost(
      sort: {
        fields: title
        order: DESC
      }
    ) {
      ...allPosts
    }
  }
`