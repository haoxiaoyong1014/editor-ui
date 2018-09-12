/**
 * @file util.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 6/11/18
 */


import axios from 'axios';
import Cookies from 'js-cookie';
import { Message } from 'iview';

let util = {

};
util.title = function (title) {
  title = title || 'editor demo';
  window.document.title = title;
};

const ajaxUrl = 'http://localhost:2020/';

util.ajaxUrl = ajaxUrl;

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

util.post = function (url, data) {
  const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : '';
  if (!data) {
    data = { token: token };
  } else {
    data.token = token;
  }
  return axios({
    method: 'post',
    baseURL: ajaxUrl,
    url,
    data: data,
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    }
  }).then(
    (response) => {
      return this.checkStatus(response);
    }
  )
};

util.checkStatus = function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  // console.log(response)
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  Message.warning('网络异常');
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
};

export default util;
