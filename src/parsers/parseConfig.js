import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import * as reducerFunctions from './reducerFunctions';

/**
 * Parse configuration
 *
 * @param {object} configuration 
 * @returns {void}
 */
export default function(configuration) {
  if (!isObject(configuration)) {
    throw new Error('Configuration needs to be an object.');
    return;
  }
  
  const persists = [];
  const actionConfig = {};
  const reducerConfig = {};
  
  forEach(configuration, (config, storeName) => {
    if (!isObject(config)) {
      throw new Error(`config.${storeName} must be an object.`);
      return;
    }
    
    if (!isObject(config.actions)) {
      throw new Error(`config.${storeName}.actions is required and must be an object.`);
      return;
    }
    
    if (config.persist) {
      persists.push(storeName);
    }
    
    const reducerMap = {};
    
    forEach(config.actions, (rawActionConfig, actionName) => {
      if (!isObject(rawActionConfig)) {
        throw new Error(`config.${storeName}.actions.${actionName} must be an object.`);
        return;
      }
      
      if (typeof rawActionConfig.reducer === 'string') {
        rawActionConfig.reducer = reducerFunctions[rawActionConfig.reducer];
      }
      
      if (!isFunction(rawActionConfig.reducer)) {
        throw new Error(`config.${storeName}.actions.${actionName}.reducer is required and must be a function.`);
        return;
      };
      
      if (actionConfig[actionName]) {
        // TODO: handle duplication
      }
      
      actionConfig[actionName] = {
        inputs: rawActionConfig.inputs,
        func: rawActionConfig.func,
      };
      
      reducerMap[actionName] = rawActionConfig.reducer;
    });
    
    reducerConfig[storeName] = {
      default: config.default === undefined ? {} : config.default,
      reducerMap: reducerMap,
    };
  });
  
  return {
    persists,
    actionConfig,
    reducerConfig,
  };
}

