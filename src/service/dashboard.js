/* eslint-disable import/prefer-default-export */
import Fetch from '@/utils/fetch';

export function getAppList() {
  return Fetch.get('/api/getAppList');
}

export function getConfigList({ appName, profiles, label }) {
  return Fetch.get('/api/getAllConfigByAppName', {
    appName, profiles, label
  });
}

export function updateKvConfiguration({
  id,
  application,
  profile,
  label,
  value1,
}) {
  return Fetch.postJson('/api/updateKvConfiguration', {
    appName: application,
    profile,
    label,
    kvData: { [id]: value1 },
  });
}

export default {
  getAppList,
  getConfigList,
  updateKvConfiguration,
};
