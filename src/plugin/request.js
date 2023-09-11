// import axios from 'axios';

// //拦截器
// //请求拦截
// axios.interceptors.request.use(config => {
//     // 删除referrer字段
//     delete config.headers['Referer'];
//     delete config.headers['Origin'];
//     console.log('request header:');
//     console.log(JSON.stringify(config));
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });
// // 响应拦截器
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


// //请求图片
// export function fetchImage(url) {
//     console.log('axios url ',url);
//     return new Promise((resolve, reject) => {
//         axios.get(url,{
//             headers:{
//                 'Content-Type': 'image/jpeg',
//                 'Accept':'image/jpeg,image/png,image/gif',
//             }
//         })
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching image:', error);
//                 reject(error);
//             });
//     });
// }

export function fetchImage(url) {
    
}