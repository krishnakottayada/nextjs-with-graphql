import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withApollo } from '../apollo/client'
import Articles from '../components/Articles'

const Index = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Articles />
      </main>

      <footer>
        Krrish Krishna
      </footer>
   </div>
  )
}

export default withApollo(Index)