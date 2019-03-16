const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {},
    })
  })
}
