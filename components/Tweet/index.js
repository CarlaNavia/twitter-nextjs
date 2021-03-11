import Avatar from 'components/Avatar'
import PropTypes from 'prop-types'
import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Tweet({avatar, img, userName, content, createdAt, id}) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = event => {
    event.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <span> · </span>
          <Link href={`/status/${id}`}>
            <a>
              <time>{timeago}</time>
            </a>
          </Link>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        div {
          padding-right: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

Tweet.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  content: PropTypes.string,
  userName: PropTypes.string,
  img: PropTypes.string,
  createdAt: PropTypes.date
}
