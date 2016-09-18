import parseConfig from './parsers/parseConfig'
import parseActions from './parsers/parseActions';
import parseReducers from './parsers/parseReducers';

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