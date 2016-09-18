export const SET = (state, action) => action.payload;

export const MERGE = (state, action) => ({
  ...state,
  ...action.payload,
});

export const CLEAR = (state, action) => ({});

export const TRUE = () => true;
export const FALSE = () => false;

export const SWITCH = (state, action) => ({
  ...state,
  [action.payload]: !state[action.payload]
});

export const SWITCH_OFF = (state, action) => ({
  ...state,
  [action.payload]: false
});
