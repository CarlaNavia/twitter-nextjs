import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import Instagram from "../components/Icons/Instagram";
import { colors } from "../styles/theme";

export default function Home() {
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
            <Button>
              <Instagram fill='#fff'/>
              Login with Instagram
            </Button>
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
  );
}
