import axios from 'axios'
// http://121.199.14.204/http:localhost:9002
const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? 'http://121.199.14.204/music-next/' : '/'

axios.defaults.baseURL = baseURL

export function get(url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
