import axios from 'axios'

const inst = axios.create({
  baseURL: '/api/v1',
})

export default inst;
