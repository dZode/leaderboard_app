import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import Artifacts from '../components/Artifacts'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>LeaderBoard B.O.B App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/add">
            <a>Add Leader</a>
          </Link>
          <Link href="/">
            <a>Artifact Leaderboard</a>
          </Link>
        </div>

        <img
          id="title"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2B49Zd6vAYqGR6_1tFkKyouH9uMoMj4tkUA&usqp=CAU"
          alt="BoB logo"
        ></img>
      </div>
      <div>
        <h1>Top 5 Stackers</h1>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
      <Artifacts/>
    </>
  )
}

export default MyApp
