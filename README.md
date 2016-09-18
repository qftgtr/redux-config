Redux Config
=========================

[![npm version](https://img.shields.io/npm/v/redux-config.svg?style=flat-square)](https://www.npmjs.com/package/redux-config)
[![npm downloads](https://img.shields.io/npm/dm/redux-config.svg?style=flat-square)](https://www.npmjs.com/package/redux-config)

<!--[![NPM](https://nodei.co/npm/redux-config.png?downloads=true)](https://nodei.co/npm/redux-config/)-->

Rapidly config [Redux](https://github.com/reactjs/redux) or [React Redux](https://github.com/reactjs/react-redux).

## Installation

This assumes that you're using [npm](http://npmjs.com/) package manager.

```bash
npm install --save redux-config
```

## Usage

### 1. Configure redux actions and reducers in a config file (e.g. `redux/config.js`)

```js
import { REDUCER } from 'redux-config'

export const reduxStore1 = {
  default: { param1: '', param2: '' },
  actions: {
    UPDATE_REDUX_STORE1: {
      inputs: ['param1', 'param2'],
      reducer: 'MERGE', // pre-defined reducer function
    },
    CLEAR_METEOR_ACCOUNT: {
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
      params: ['list'],
      reducer: 'SET', // pre-defined reducer function
    },
    CLEAR_REDUX_STORE2: {
      params: [],
      reducer: 'CLEAR', // pre-defined reducer function
    }
  },
};
```


#### 1.1. Predefined reducer functions

See [`src/parsers/reducerFunctions.js`](https://github.com/qftgtr/redux-config/tree/master/src/parsers/reducerFunctions.js)


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

### 3. Use actions and reducers
```js
import { connect } from 'react-redux'
import { actions } from 'path/to/redux/config.js'

class ReactComponent extends ...

module.export = connect()(ReactComponent)

```


## How Does It Work?


## License

MIT