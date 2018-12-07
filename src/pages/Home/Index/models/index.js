import * as apiservices from 'services/api';

export default {
  namespace: 'index',
  state: {
    notice: [],
  },
  effects: {
    *fetchNotice(_, { call, put }) {
      const data = yield call(apiservices.users);
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },

  subscriptions: {
    // setupHistory({ dispatch, history }) {
    //   dispatch({
    //     type: 'fetchNotice',
    //     payload: {}
    //   })
    // }
  },
};
