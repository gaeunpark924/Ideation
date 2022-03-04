import {createApi} from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: '1-vZgjCJUeOQDzDZ6yd1XdTakyHko4N25qYY9N1ejVo',
  fetch: nodeFetch,
});

unsplash.photos.get(
  {photoId: '123'},
  // `fetch` options to be sent only with _this_ request
  {headers: {'X-Custom-Header-2': 'bar'}},
);
