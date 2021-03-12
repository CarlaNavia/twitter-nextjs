import Tweet from 'components/Tweet'
import useUser from 'hooks/useUser'
import {useEffect, useState} from 'react'
import {listenLatestTweets} from 'firebase/client'
import Create from 'components/Icons/Create'
import Link from 'next/link'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import {colors} from 'styles/theme'
import Head from 'next/head'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  // Limpiar las suscripciones activas para que el componente no dé problemas
  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = listenLatestTweets(setTimeline)
    }
    return () => unsuscribe && unsuscribe()
  }, [user])

  // Cancelar una llamada fetch: crear una variable para saber si el componente está montado o no

  return (
    <>
      <Head>
        <title>Inicio / Twitter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({createdAt, id, img, userName, avatar, content, userId}) => (
            <Tweet
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          align-items: center;
          backdrop-filter: blur(5px);
          background: #ffffffaa;
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: fixed;
          top: 0;
          width: 100%;
        }
        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800px;
          padding-left: 15px;
        }

        nav {
          background-color: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
