import React from 'react'
import { shallow, mount, configure }  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cui from './ReactCui'

configure({ adapter: new Adapter() })

test('Component have required UID parameter', () => {
  const uid = 'abc123'
  const Component = mount(<Cui uid={uid} />)
  expect(Component.props().uid).toBe(uid)
})

test('Component should have the className `cui-embed`', () => {
  const uid = 'abc123'
  const Component = shallow(<Cui uid={uid} />)

  expect(Component.is('.cui-embed')).toBe(true)
})
