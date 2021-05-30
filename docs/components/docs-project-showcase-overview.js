import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import {Card, CardTitle, CardText, CardSubtitle, CardBody, CardBody } from 'reactstrap'


import getPageTitle from "../utils/get-page-title"

const tenDaysInMS = 10 * 24 * 60 * 60 * 1000;

const DocsProjectsData = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              order
              title
              tags
              featuredImage {
                childImageSharp {
                  fixed(width:1200) {
                    src
                  }
                }
              }
            }
            headings(depth: h1) {
              value
            }
            parent {
              ... on File {
                modifiedTime(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    }
  `)

  console.log(props)
  const projects = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => page.fields.slug.match(/^\/project-showcase\/.+/))
    .map(page => ({
      order: page.frontmatter.order,
      title: getPageTitle(page),
      url: page.fields.slug,
      tags: page.frontmatter.tags,
      featureImage: page.frontmatter.featureImage.childImageSharp.fluid,
      new: (+new Date() - +new Date(page.frontmatter.updated)) < tenDaysInMS
    }))
    .sort((a, b) => +new Date(b.updated) - +new Date(a.updated))
    .sort((a, b) => a.order - b.order)


  const tagsSet = new Set()
  projects.forEach(ex => {
    ex.tags.forEach(tag => tagsSet.add(tag))
  })

  const tags = Array.from(tagsSet)
  tags.unshift("All projects")

  return props.children({ projects, tags })
}

class DocsProjectsOverview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTag: "All Projects"
    }
  }

  render() {
    const activeTag = this.state.activeTag

    return (
      <DocsProjectsData>
        {({ projects, tags }) => (
            <Card>
                <Img className="project-feature-image-top" fluid={project.featureImage} />
                <CardBody>
                    <CardTitle>
                        {projects.title}
                    </CardTitle>
                    <CardSubtitle>
                            AAAAAAAA
                    </CardSubtitle>
                    <CardText>
                            AAA
                    </CardText>

                </CardBody>
            </Card>  

        )}
      </DocsProjectsData>
    )
  }
}

export default DocsProjectsOverview