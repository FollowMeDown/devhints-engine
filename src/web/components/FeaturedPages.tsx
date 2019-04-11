import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import FeaturedPageLink from './FeaturedPageLink'

interface Context {
  nodePath: string
  category: string
  title: string
}

interface Node {
  id: string
  context: Context
}

interface Data {
  pages: {
    nodes: Node[]
  }
}

interface ViewProps {
  data: Data
}

const FeaturedPages = () => {
  return (
    <StaticQuery
      query={query}
      render={(data: Data) => <FeaturedPagesView data={data} />}
    />
  )
}

const FeaturedPagesView = (props: ViewProps) => {
  const { nodes } = props.data.pages
  return (
    <div>
      {nodes.map(node => {
        return (
          <FeaturedPageLink
            key={node.id}
            path={node.context.nodePath}
            title={node.context.title}
          />
        )
      })}
    </div>
  )
}

const query = graphql`
  query FeaturedPagesQuery {
    pages: allSitePage(
      filter: {
        context: { isFeatured: { eq: true }, nodeType: { eq: "sheet" } }
      }
      sort: { fields: [context___updated], order: DESC }
      limit: 8
    ) {
      nodes {
        id
        context {
          nodePath
          category
          title
        }
      }
    }
  }
`

/*
 * Export
 */

export default FeaturedPages
export { FeaturedPagesView as View }
