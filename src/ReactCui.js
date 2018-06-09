import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export const EMBED_URL =
  'https://typeform-labs.s3.amazonaws.com/cui/cui-embed.js'

class Cui extends Component {
  componentDidMount () {
    if (document) {
      if (!scriptTagExists({ document })) {
        const embedJs = document.createElement('script')
        embedJs.type = 'text/javascript'
        embedJs.src = EMBED_URL
        embedJs.async = true
        document.getElementsByTagName('head')[0].appendChild(embedJs)
      }
    }
  }

  render () {
    const { uid, height, avatar, theme } = this.props
    return (
      <Fragment>
        {uid ? (
          <div
            key={`cui-${uid}`}
            className='cui-embed'
            data-cui-uid={uid}
            data-cui-height={height}
            data-cui-avatar={avatar}
            data-cui-theme={theme}
          />
        ) : null}
      </Fragment>
    )
  }
}

Cui.propTypes = {
  uid: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatar: PropTypes.string,
  theme: PropTypes.string
}

export default Cui

const scriptTagExists = ({ document }) => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const cuiEmbedScriptTags = [].filter.call(scriptTags, script => {
    return script.src === EMBED_URL
  })
  return !!cuiEmbedScriptTags.length
}
