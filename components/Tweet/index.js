import Avatar from 'components/Avatar'
import PropTypes from 'prop-types'

export default function Tweet({avatar, userName, content, createdAt, id}) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <span> · </span>
          <date>{createdAt}</date>
          <p>{content}</p>
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
  createdAt: PropTypes.date
}
