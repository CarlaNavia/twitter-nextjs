import AppLayout from 'components/AppLayout'
import PropTypes from 'prop-types'

export default function App({Component, pageProps}) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object
}
