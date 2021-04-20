// components/Users.js
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ArticlesQuery = gql`
  query Articles {
    articles{
        _id,
        title
        content
    }
  }
`

const Articles = () => {
  const { loading, error, data } = useQuery(ArticlesQuery)

  if (loading) return 'loading articles...'
  if (error) return 'error while loading articles'

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Articles title</th>
            <th>Articles desc</th>
          </tr>
        </thead>
        <tbody>
          {data.articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{ ReactHtmlParser (article.content)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Articles