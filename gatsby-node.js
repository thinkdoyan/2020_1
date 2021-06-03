import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    pages {
      edges {
        node {
          isFrontPage
          isPostsPage
          isPrivacyPage
          isRestricted
        }
      }
    }
    menu(id: "") {
      name
    }
    menuItem(id: "") {
      label
    }
    writingSettings {
      defaultCategory
      defaultPostFormat
      useSmilies
    }
    post(id: "1") {
      id
    }
  }
`
