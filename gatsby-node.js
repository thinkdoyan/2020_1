const path = require(`path`)
const glob = require(`glob`)

const createBlog = require(`./create/createBlog`)
const createContentTypes = require(`./create/createContentTypes`)
const createCategories = require(`./create/createCategories`)
const createAuthors = require(`./create/createAuthors`)

const getTemplates = () => {
  const sitePath = path.resolve(`./`)
  return glob.sync(`./src/templates/**/*.js`, { cwd: sitePath })
}

exports.createPages = async (props) => {
  const { data: wpSettings } = await props.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)


  const perPage = wpSettings.wp.readingSettings.postsPerPage || 10
  const blogURI = "/"
  const templates = getTemplates()

  
  
import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    menu(id: "1,2,3") {
      name
    }
    menuItem(id: "") {
      label
      locations
    }
    page(id: "1, 2, 3, 4, 5, 6") {
      id
    }
    postBy(postId: 1) {
      id
    }
    theme(id: "")
  }
`

export default ComponentName

 
  
  
  
  await createContentTypes(props, { templates })
  await createBlog(props, { perPage, blogURI })
  await createCategories(props, { perPage })
  await createAuthors(props, { perPage })
}

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// We do this, because the Avatar doesn't get handled as a File from the gatsby-source plugin yet. This might change in the future.
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WpAvatar: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
