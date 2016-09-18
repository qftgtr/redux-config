import forEach from 'lodash/forEach';
import { handleActions } from 'redux-actions';

export default function(reducersConfig) {
  const reducers = {};
  
  forEach(reducersConfig, (config, storeName) => {
    reducers[storeName] = handleActions(config.reducerMap, config.default);
  });
  
  return reducers;
}
