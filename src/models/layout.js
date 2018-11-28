import * as apiservices from 'services/api';

export default {
  namespace: 'layout',
  state: {
    action: '',
  },
  effects: {
  },

  reducers: {
    changeAction(state, { payload }) {
      return {
        ...state,
        action: payload.newAction.toLowerCase(),
      }
    }
  },

  subscriptions: {
    // setupHistory({ dispatch, history }) {
    //   dispatch({
    //     type: 'fetchNotice',
    //     payload: {}
    //   })
    // }
    setup({ dispatch, history }) {

      return history.listen(({ pathname, query }) => {
        console.log('history', history)
        // location.action
        dispatch({ type: 'changeAction', payload: { newAction: history.action || '' } });
      });
    },
  },
};
