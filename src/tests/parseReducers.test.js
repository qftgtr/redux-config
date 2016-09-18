import { expect } from 'chai';
import parseReducers from '../parsers/parseReducers';

const reducerConfig = {
  store1: {
    reducerMap: () => 1,
    'default': {},
  },
  store2: {
    reducerMap: () => 2,
    'defualt': {},
  }
};

describe('parseReducers', () => {
  it('should succeed with reducerConfig={}', () => {
    expect(parseReducers({})).to.deep.equal({});
  });
  
  it('should succeed with reducerConfig={ store: { default: {}, reducerMap: {} } }', () => {
    expect(parseReducers({
      store: {
        default: {},
        reducerMap: {}
      }
    })).to.have.all.keys('store');
  });
});

describe('parseReducers(reducerConfig)', () => {
  it('should run without an error', () => {
    expect(() => parseReducers(reducerConfig)).not.to.throw(Error);
  });
  
  const reducers = parseReducers(reducerConfig);
  it('should return an object with keys [store1, store2]', () => {
    expect(reducers).to.be.a('object');
    expect(reducers).to.have.all.keys('store1', 'store2');
  });
  
  describe('.store1', () => {
    it('should be a function', () => {
      expect(reducers.store1).to.be.a('function');
    });
  });
  
  describe('.store2', () => {
    it('should be a function', () => {
      expect(reducers.store2).to.be.a('function');
    });
  });
});