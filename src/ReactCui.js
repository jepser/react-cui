import React, { Component } from 'react'

const embedUrl = 'https://typeform-labs.s3.amazonaws.com/cui/cui-embed.js'

class Cui extends Component {
  componentDidMount() {
    if (document) {
      const embedJs = document.createElement('script')
      embedJs.type = 'text/javascript'
      embedJs.src = embedUrl
      embedJs.async = true
      document.getElementsByTagName('head')[0].appendChild(embedJs)
    }
  }

  render() {
    const {
      uid
    } = this.props
    return (
      <div key={`cui-${uid}`} className='cui-embed' data-cui-uid={uid}></div>
    )
  }
}

export default Cui
