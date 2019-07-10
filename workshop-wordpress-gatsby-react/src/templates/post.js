import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default (props) => {
  const singlePost = props.data.wordpressPost;

  return (
    <Layout>
      <h1>{singlePost.title}</h1>
      <img  src={singlePost.featured_media.source_url}
            alt={singlePost.featured_media.alt_text}
      />
      <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
    </Layout>
  )
}

export const query = graphql`
  query {
    wordpressPost {
      title
      content
      featured_media {
        id
        source_url
        alt_text
      }
    }
  }
`