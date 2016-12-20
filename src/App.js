import React, { Component } from 'react';
import EventEmitter from 'events'
import 'whatwg-fetch'
import logo from './logo.svg';
import './App.css';
import { fetchEndpoint, asyncFetchPost } from './helpers'
import PostList from './PostList'

// setup a skeletal state
const initalState = {
  posts: []
}

const StateManager = seedState => {
  let _stateman = new EventEmitter()
  _stateman.state = seedState ? seedState : {}

  // update the current state by using
  // es6 object rest syntax
  _stateman.on('update', function (payload) {
    this.state = { ...this.state, ...payload}
    this.cb(this.state)
  })

  // overwrite the current state by using
  _stateman.on('set', function (payload) {
    this.state = {...payload}
    this.cb(this.state)
  })
  return _stateman
}

// create a StateManager called State
const State = StateManager(initalState)

class App extends Component {
  constructor () {
    super()

    // set the State manager's callback function; this
    // function is passed updated state objects when
    // a new event was processed using react's internal magic
    State.cb = newState => this.setState({ ...newState })
    // set our initial state to that stored in the
    // State manager's state property...
    this.state = { ...State.state }
  }

  componentDidMount () {
    fetchEndpoint()
      .then(x => State.emit('update', {posts: x}))
  }

  render () {
    const { posts } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {`There are ${posts.length} posts`}
        </p>
        <div>
          <PostList posts={posts} emitter={State}/>
        </div>
      </div>
    )
  }
}

export default App
