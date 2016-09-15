import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import pick from 'lodash/pick';
import { createAction } from 'redux-actions';

export default function(actionConfig) {
  const actions = {};
  
  // fill actions from action inputs
  forEach(actionConfig, (config, type) => {
    
    const payloadCreator = (input = {}) => {
      let output;
      
      if (isArray(config.inputs)) {
        // if config.inputs is set, pick input params
        output = pick(input, config.inputs);
      } else {
        output = input;
      }
      
      if (isFunction(config.func)) {
        // if config.func is set, apply it
        output = config.func(output);
      }
      
//      console.log(Date.now(), type, output);
      
      return output;
    };
    
    actions[type] = createAction(type, payloadCreator);
  });

  return actions;
}
