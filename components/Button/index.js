import {colors} from '../../styles/theme'
import PropTypes from 'prop-types'

export default function Button({children, onClick}) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 800px;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

Button.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}
