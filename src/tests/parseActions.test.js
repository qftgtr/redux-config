import { expect } from 'chai';
import parseActions from '../components/parseActions';

const actionConfig = {
  ACTION1: {
    inputs: ['x', 'y'],
  },
  ACTION2: {
    func: input => {
      input.x = input.x + 1;
      return input;
    },
  }
};

describe('parseActions', () => {
  it('should succeed with actionConfig={}', () => {
    expect(parseActions({})).to.deep.equal({});
  });
  
  it('should succeed with actionConfig={ ACTION: {} }', () => {
    expect(parseActions({ACTION: {}}).ACTION(123)).to.deep.equal({
      type: 'ACTION',
      payload: 123
    });
  });
});

describe('parseActions(actionConfig)', () => {
  it('should run without an error', () => {
    expect(() => parseActions(actionConfig)).not.to.throw(Error);
  });
  
  const actions = parseActions(actionConfig);
  it('should return an object with keys [ACTION1, ACTION2]', () => {
    expect(actions).to.be.a('object');
    expect(actions).to.have.all.keys('ACTION1', 'ACTION2');
  });
    
  describe('.ACTION1', () => {
    it('should be a function', () => {
      expect(actions.ACTION1).to.be.a('function');
    });
    
    it('should succeed with input { x:1, y:2, z:3 }', () => {
      expect(actions.ACTION1({ x:1, y:2, z:3 })).to.deep.equal({
        type: 'ACTION1',
        payload: {
          x: 1,
          y: 2,
        }
      });
    });
  });
  
  describe('.ACTION2', () => {
    it('should be a function', () => {
      expect(actions.ACTION2).to.be.a('function');
    });
    
    it('should succeed with input { x:1, y:2, z:3 }', () => {
      expect(actions.ACTION2({ x:1, y:2, z:3 })).to.deep.equal({
        type: 'ACTION2',
        payload: {
          x: 2,
          y: 2,
          z: 3
        }
      });
    });
  });
});