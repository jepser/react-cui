import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'

export const EMBED_URL = 'https://labs-assets.typeform.com/cui/cui-embed.js'

class Cui extends Component {
  constructor () {
    super()
    this.ref = createRef()
  }
  componentDidMount () {
    if (!scriptTagExists({ document })) {
      const embedJs = document.createElement('script')
      embedJs.type = 'text/javascript'
      embedJs.id = 'cui-embed-script'
      embedJs.src = EMBED_URL
      embedJs.async = true
      document.head.appendChild(embedJs)
    } else {
      window.__CUI && window.__CUI.register(this.ref.current)
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
            ref={this.ref}
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

const getScriptTags = ({ document }) => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const cuiEmbedScriptTags = [].filter.call(scriptTags, script => {
    return script.src === EMBED_URL
  })
  return cuiEmbedScriptTags
}

const scriptTagExists = ({ document }) => {
  const scriptTags = getScriptTags({ document })

  return !!scriptTags.length
}
