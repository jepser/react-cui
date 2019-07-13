import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cui from './react-cui'
import { EMBED_URL } from './constants'

console.log(EMBED_URL)

configure({ adapter: new Adapter() })

const getEmbedScriptTag = ({ document }) => {
  let embedScriptTags = []
  const scriptTags = document.getElementsByTagName('head')[0].childNodes

  scriptTags.forEach(script => {
    if (script.src === EMBED_URL) embedScriptTags.push(scriptTags)
  })

  return embedScriptTags
}

describe('<Cui />', () => {
  test('Component have required UID parameter passed to render', () => {
    const uid = 'abc123'
    const Component = mount(<Cui uid={uid} />)
    expect(Component.render().attr('data-cui-uid')).toBe(uid)
  })

  test('Component have optional parameters being passed to the DOM element', () => {
    const uid = 'abc123'
    const height = 500
    const avatar = 'https://avatar.com/profile.jpg'
    const theme = '#333'
    const Component = mount(
      <Cui uid={uid} height={height} avatar={avatar} theme={theme} />
    )
    const ComponentDOM = Component.render()

    expect(ComponentDOM.attr('data-cui-height')).toBe(height.toString())
    expect(ComponentDOM.attr('data-cui-avatar')).toBe(avatar)
    expect(ComponentDOM.attr('data-cui-theme')).toBe(theme)
  })

  test('Component should have the className `cui-embed` so the scripts loads the CUI inside', () => {
    const uid = 'abc123'
    const Component = shallow(<Cui uid={uid} />)

    expect(Component.find('.cui-embed').length).toBe(1)
  })

  test('Component should inject ONLY ONE script tag with the embed url', () => {
    const Component = mount(<Cui uid={'123'} />)

    const scriptTags = getEmbedScriptTag({ document })

    expect(scriptTags.length).toBe(1)
  })
})
