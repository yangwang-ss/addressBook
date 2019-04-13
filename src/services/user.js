import request from '@/utils/request';



export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function login(params){
  return request('/medical/doctor/login',{
    method: 'POST',
    body: params,
  });
}
