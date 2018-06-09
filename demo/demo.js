import React from 'react'
import ReactDOM from 'react-dom'
import Cui from '../src/ReactCui'

const App = ({}) => {
  return <div>
    <p>Let's add avatar and theme</p>
    <Cui uid="Sb1WbK" theme="red" avatar="http://i.imgur.com/6jr3M0j.png" height="400" />
  </div>
}


ReactDOM.render(<App />, document.getElementById('app'))
