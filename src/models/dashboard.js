import dashboardService from '@/service/dashboard';

export default {
  namespace: 'dashboard',

  state: {
    appList: [],
    configList: [],
  },

  effects: {
    *getAppList(_, { select, put, call }) {
      const appList = yield select(({ dashboard }) => dashboard.appList);
      if (appList.length > 0) {
        return;
      }
      const { data } = yield call(dashboardService.getAppList);
      yield put({ type: 'setAppList', payload: data });
    },
    *getConfigList({ payload }, { put, call }) {
      const { data } = yield call(dashboardService.getConfigList, payload);
      yield put({ type: 'setConfigList', payload: data });
    },
    *updateConfig({ payload }, { select, put, call }) {
      const { data } = yield call(dashboardService.updateKvConfiguration, payload);
      
      const query = yield select(({ location }) => location.query)
      yield put({ type: 'getAppList',  payload: query});

      return data;
    }
  },

  reducers: {
    setAppList(state, { payload }) {
      return {
        ...state,
        appList: payload,
      };
    },
    setConfigList(state, { payload }) {
      return {
        ...state,
        configList: payload,
      };
    },
  },

  subscriptions: {
    setup(payload) {
      const { dispatch, history } = payload;
      console.log(payload);
      return history.listen(({ pathname, query }) => {
        console.log(query);
        dispatch({ type: 'getAppList' });
        if (query.appName) {
          dispatch({ type: 'getConfigList', payload: { ...query } });
        }
      });
    },
  },
};
