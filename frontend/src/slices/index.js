import { combineReducers } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions } from './сhannelsInfo';
import messagesInfo, { actions as messagesInfoActions } from './messagesInfo';

const actions = {
  ...channelsInfoActions,
  ...messagesInfoActions,
};

export {
  actions,
};

export default combineReducers({
  channelsInfo,
  messagesInfo,
});