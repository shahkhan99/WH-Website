import React, { Component } from 'react'
import Routes from './routes/routes'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <Routes />
  }
}
