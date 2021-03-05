import PropTypes from 'prop-types'

export default function Avatar({alt, src, text}) {
  return (
    <>
      <div>
        <img alt={alt} src={src} title={alt} />
        {text && <strong>{text || alt}</strong>}
      </div>

      <style jsx>{`
        div {
          align-items: center;
          display: flex;
        }

        img {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }

        img + strong {
          margin-left: 8px;
        }
      `}</style>
    </>
  )
}

Avatar.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string
}
