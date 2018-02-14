import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

function onSucces(response){
  return response.json();
}

function onError(err){
  console.log(err);// eslint-disable-line no-console
}

function get(url){
  return fetch(baseUrl + url).then(onSucces,onError);
}

function del(url){
  const request = new Request(baseUrl+url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSucces, onError);
}

export function getUsers(){
  return get('users');
}

export function delUsers(id){
  return del(`user/${id}`);
}
