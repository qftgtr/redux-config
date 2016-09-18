import { expect } from 'chai';
import parseConfig from '../parsers/parseConfig';

describe('parseConfig(configuration)', () => {
  it('should throw an error if configuration is not set', () => {
    expect(() => parseConfig()).to.throw(Error, 'Configuration needs to be an object');
  });
  
  let config1 = {};
  it('should succeed with configuration = '+JSON.stringify(config1), () => {
    expect(parseConfig(config1)).to.deep.equal({
      persists: [],
      actionConfig: {},
      reducerConfig: {},
    });
  });
  
  let config2 = { store: 1 };
  it('should throw an error with configuration = '+JSON.stringify(config2), () => {
    expect(() => parseConfig(config2)).to.throw(Error, 'config.store must be an object.');
  });
  
  let config3 = { store: {} };
  it('should throw an error with configuration = '+JSON.stringify(config3), () => {
    expect(() => parseConfig(config3)).to.throw(Error, 'config.store.actions is required and must be an object.');
  });
  
  let config4 = { store: {persist: true, actions: {}}};
  it('should succeed with configuration = '+JSON.stringify(config4), () => {
    expect(parseConfig(config4)).to.deep.equal({
      persists: [ 'store' ],
      actionConfig: {},
      reducerConfig: {
        store: {
          default: {},
          reducerMap: {}
        }
      },
    });
  });
  
  let config5 = {
    store: {
      actions: {
        ACTION: {}
      }
    }
  };
  it('should throw an error with configuration = '+JSON.stringify(config5), () => {
    expect(() => parseConfig(config5)).to.throw(Error, 'config.store.actions.ACTION.reducer is required and must be a function.')
  });
  
  let config6 = {
    store: {
      persist: true,
      default: {x: 1},
      actions: {
        ACTION: {
          inputs: ['x'],
          reducer: 'SET'
        }
      }
    }
  };
  
  it('should succeed with configuration = '+JSON.stringify(config6), () => {
    expect(parseConfig(config6)).to.deep.equal({
      persists: [ 'store' ],
      actionConfig: {
        ACTION: {
          inputs: ['x'],
          func: undefined,
        }
      },
      reducerConfig: {
        store: {
          default: { x: 1 },
          reducerMap: {
            ACTION: config6.store.actions.ACTION.reducer
          }
        }
      },
    });
  });
});