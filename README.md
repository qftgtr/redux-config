Redux Config
=========================

Rapidly config [Redux](https://github.com/reactjs/redux) or [React Redux](https://github.com/reactjs/react-redux).

[![npm version](https://img.shields.io/npm/v/redux-config.svg?style=flat-square)](https://www.npmjs.com/package/redux-config)
[![npm downloads](https://img.shields.io/npm/dm/redux-config.svg?style=flat-square)](https://www.npmjs.com/package/redux-config)

<!--[![NPM](https://nodei.co/npm/redux-config.png?downloads=true)](https://nodei.co/npm/redux-config/)-->

[Redux](http://redux.js.org/) is a very popular state management library for [React](https://facebook.github.io/react/) and [React Native](http://facebook.github.io/react-native/). I personally very appreciate its simplistic design. But in contrast to that, setting up Redux for a new project (especially for the first time) is not very straightforward, and adding new actions/reducers does take some time on duplicated codes. I feel there should be a better way to set up Redux and take the full advantage of its simplicity. This is the reason I made this library so that configure Redux could be done in just a few lines of code.

This is a very early release now, so if you have any questions/suggestions, or find any bugs, please [submit an issue](https://github.com/qftgtr/redux-config/issues/new). Thanks!

## Installation

```bash
npm install --save redux-config
```

## Usage

I'm working on a detailed documentation, but the following 3-step should be a rough demonstration of how `redux-config` works. I also wish to write a 5-min setup guide for those who learn Redux for the first time. It should be helpful since when I first encountered Redux, it took me almost a full day to read through its [documentation](http://redux.js.org/docs/basics/) to just write a helloworld.

### 1. Configure redux actions and reducers in a config file (e.g. `redux/config.js`)

```js
export const reduxStore1 = {
  default: { param1: '', param2: '' },
  actions: {
    UPDATE_REDUX_STORE1: {
      inputs: ['param1', 'param2'],
      reducer: 'MERGE', // pre-defined reducer function
    },
    CLEAR_REDUX_STORE1: {
      inputs: [],
      reducer: state => {
        return { param1: '', param2: '' };
      },
    },
  }
};

export const reduxStore2 = {
  default: { list: [] },
  actions: {
    SET_REDUX_STORE2: {
      inputs: ['list'],
      reducer: 'SET', // pre-defined reducer function
    },
    CLEAR_REDUX_STORE2: {
      inputs: [],
      reducer: 'CLEAR', // pre-defined reducer function
    }
  },
};
```


#### 1.1. Predefined reducer functions

See [`src/parsers/reducerFunctions.js`](https://github.com/qftgtr/redux-config/blob/master/src/parsers/reducerFunctions.js)


### 2. Initialize redux store (e.g. `redux/index.js`)

```js
import {
  createStore,
  combineReducers,
} from 'redux'

import configureRedux from 'redux-config'
import * as config from './config' // read config file
const { actions, reducers } = configureRedux(config)

const store = createStore(combineReducers(reducers));

module.exports = {
  actions,
  store,
};
```

### 3. Use actions and reducers in React components

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'path/to/redux'

class ReactComponent extends Component {
  ...
  
  // the method that calls the redux action
  callReduxAction(val1, val2) {
    this.props.actions.UPDATE_REDUX_STORE1({ param1: val1, param2: val2 });
  }
  
  ...
  
  render() {
    ...
    
    // read data from redux store
    const reduxStore1Param1 = this.props.reduxStore1.param1;
    const reduxStore2List = this.props.reduxStore2.list;
    
    ...
  }
}

function mapStateToProps(state) {
  return {
    reduxStore1: state.reduxStore1,
    reduxStore2: state.reduxStore2
  };
}

module.exports = connect(mapStateToProps, actions)(ReactComponent);
```


## How Does It Work?

Basically the config file (`config.js`) is parsed by `redux-config` to generate Redux actions and reducers automatically.

## License

MIT
