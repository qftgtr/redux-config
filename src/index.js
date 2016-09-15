import parseConfig from './components/parseConfig'
import parseActions from './components/parseActions';
import parseReducers from './components/parseReducers';

export default function(configuration) {
  const {
    persists,
    actionConfig,
    reducerConfig,
  } = parseConfig(configuration);
  
  const actions = parseActions(actionConfig);
  const reducers = parseReducers(reducerConfig);
  
  return {
    persists,
    actions,
    reducers,
  };
}