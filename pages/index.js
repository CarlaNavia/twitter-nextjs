import {useEffect} from 'react'

import Head from 'next/head'
import {useRouter} from 'next/router'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import Github from 'components/Icons/GitHub'

import {colors} from 'styles/theme'

import {loginWithGitHub} from 'firebase/client'

import useUser, {USER_STATES} from 'hooks/useUser'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch(err => {
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <Github fill="#ffffff" />
                Login with GitHub
              </Button>
            )}

            {user === USER_STATES.NOT_KNOWN && <span>Loading...</span>}
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
