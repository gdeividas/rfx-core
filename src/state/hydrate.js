/* eslint no-undef: 0 */
/* eslint no-underscore-dangle: 0 */
import jsonStringifySafe from 'json-stringify-safe';
import { toJS } from 'mobx';
import $store from './store';

/**
 Dehydrate (on server)
*/
export function dehydrate() {
  // convert store to json
  return jsonStringifySafe(toJS($store.get(), true));
}

/**
  Rehydrate (on client)
*/
export function rehydrate() {
  // inject initial state into stores
  return $store.set(JSON.parse(window.__STATE));
}


/**
  HRM Rehydrate (on 'module.hot.accept')
*/
export function hotRehydrate() {
   window.__STORE = $store.set(JSON.parse(dehydrate()));
   return window.__STORE;
}
