import Avatar from 'components/Avatar'
import PropTypes from 'prop-types'

export default function Tweet({avatar, username, message, id}) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid lightgrey;
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
      `}</style>
    </>
  )
}

Tweet.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  message: PropTypes.string,
  username: PropTypes.string
}
