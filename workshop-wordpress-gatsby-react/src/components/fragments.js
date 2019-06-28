import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment allPosts on wordpress__POSTConnection {
    edges {
      node {
        id
        title
        content
        date(formatString: "dddd DD MMMM YYYY")
        categories {
          name
        }
      }
    }
  }
`