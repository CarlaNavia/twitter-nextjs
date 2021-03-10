import Avatar from 'components/Avatar'
import PropTypes from 'prop-types'
import useTimeAgo from 'hooks/useTimeAgo'

export default function Tweet({avatar, img, userName, content, createdAt, id}) {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <span> · </span>
          <date>{timeago}</date>
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

        date {
          color: #555;
          font-size: 14px;
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
