import {useEffect, useState} from 'react'
import Head from 'next/head'

import Avatar from 'components/Avatar'
import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import Github from 'components/Icons/index'

import {colors} from 'styles/theme'

import {loginWithGitHub, onAuthStateChanged} from 'firebase/client'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>Twitter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/twitter-logo.png" alt="Logo" />
          <h1>Twitter</h1>
          <h2>Talk about development with developers</h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <Github fill="#ffffff" />
                Login with GitHub
              </Button>
            )}

            {user && user.avatar && (
              <div>
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
          img {
            width: 120px;
          }

          div {
            margin-top: 16px;
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }

          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
          }

          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
