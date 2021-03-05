import AppLayout from 'components/AppLayout'
import Tweet from 'components/Tweet'
import {useEffect, useState} from 'react'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  })

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({id, username, avatar, message}) => (
            <Tweet
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
          display: flex;
          height: 49px;
          position: fixed;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800px;
        }

        section {
          padding-top: 49px;
        }

        nav {
          border-top: 1px solid #ccc;
          bottom: 0;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
