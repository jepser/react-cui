import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'

import { scriptTagExists } from './utils'
import { EMBED_URL } from './constants'

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
