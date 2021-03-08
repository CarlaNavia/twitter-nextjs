import AppLayout from 'components/AppLayout'
import Tweet from 'components/Tweet'
import useUser from 'hooks/useUser'
import {useEffect, useState} from 'react'
import {fetchLatestTweets} from 'firebase/client'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestTweets().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({createdAt, id, userName, avatar, content, userId}) => (
              <Tweet
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
              />
            )
          )}
        </section>
        <nav></nav>
      </AppLayout>

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

        h2 {
          font-size: 21px;
          font-weight: 800px;
          padding-left: 15px;
        }

        nav {
          background-color: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
