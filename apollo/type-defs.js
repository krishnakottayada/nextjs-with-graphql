import {  gql } from 'apollo-server-micro'


export const typeDefs = gql`
  type Article {
    _id: ID!
    title: String!
    content: String!
    short_description: String!
    url: String!
    featured_image: String!
    modified: String!
    horoscope_icon: String!
    seo_title: String!
    seo_keyword: String!
    seo_description: String!
    seo_news_keyword: String!
    horoscope_css_props: String!
    share_facebook_url: String!
    share_twitter_url: String!
    sub_title: String!
    shorten_url: String!
    author: String!
  }

  type Query {
    articles: [Article]
  }
`