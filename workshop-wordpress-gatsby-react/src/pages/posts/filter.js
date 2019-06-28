import React from "react"
import { graphql } from 'gatsby'
import PostsList from "../../components/postsList";

export default (props) => {
  console.log("test" , props.data)
  return (
    <PostsList
      title="Posts filter by category Boston"
      data={props.data.allWordpressPost}
    />
  )
}

export const query = graphql`
  query {
    allWordpressPost(
      filter: {
        categories: {
          elemMatch: {
            name: {
              eq: "Boston"
            }
          }
        }
      }
    ) {
      ...allPosts
    }
  }
`