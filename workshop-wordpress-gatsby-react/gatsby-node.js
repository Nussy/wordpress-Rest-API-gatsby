/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }`
    ).then(result => {
      // Create posts pages.
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        createPage({
          path: `/post/${node.slug}/`,
          component: path.resolve(`./src/templates/post.js`),
        })
      })
      resolve()
    })
  })
}