import Tweet from 'components/Tweet'
import {firestore} from 'firebase/admin'
import {useRouter} from 'next/router'

export default function TweetPageDetail(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>
  return (
    <>
      <Tweet {...props} />
      <style jsx>{``}</style>
    </>
  )
}
// decir cuáles son los "paths" que debe crear
export async function getStaticPaths() {
  return {
    paths: [{params: {id: 'kxJ9jQxSdPlw6XWMnMl3'}}],
    fallback: true
  }
}
export async function getStaticProps(context) {
  const {params} = context
  const {id} = params

  return firestore
    .collection('tweets')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id
      const {createdAt} = data

      const props = {...data, id, createdAt: +createdAt.toDate()}
      return {props}
    })
    .catch(() => {
      return {props: {}}
    })
}

// pre-render a page whose data must be fetched at request time
// export async function getServerSideProps(context) {
//   // en el context encontramos = params, res, req, query
//   const {params, res} = context
//   const {id} = params

//   const apiResponse = await fetch(`http://localhost:3000/api/tweets/${id}`)
//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return {props}
//   }
//   if (res) {
//     res.writeHead(301, {Location: '/home'}).end()
//   }
// }
