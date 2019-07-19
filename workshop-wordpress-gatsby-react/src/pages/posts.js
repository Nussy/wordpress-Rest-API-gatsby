import React from "react"
import { graphql, Link } from 'gatsby'
import Layout from "../components/layout"

export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>

      {props.data.allWordpressPost.edges.map(post => {
        return (
          <div key={post.node.id} style={{marginBottom: '50px'}}>
            <Link to={`post/${post.node.slug}`}>
              <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
            <a target="_blank" rel="noopener noreferrer" href={post.node.acf.field_url}>
              {post.node.acf.field_url}
            </a>
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
          slug
          id
          title
          content
          acf {
            field_url
          }
        }
      }
    }
  }
`