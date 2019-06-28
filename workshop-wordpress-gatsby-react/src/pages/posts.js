import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>
      {props.data.allWordpressPost.edges.map(({node}) => {
        return (
          <div key={node.id}>
            <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
            <p dangerouslySetInnerHTML={{ __html: node.content }} />
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`