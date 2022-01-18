import axios from 'axios';
const KEY =
  '877649815167-nom23gv3btqp9ls8j7o1pd4v7i3lea0m.apps.googleusercontent.com';
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY,
  },
});
