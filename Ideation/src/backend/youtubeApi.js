export async function get_api_res(search, nextPageToken) {
  let param = {
    q: search,
    part: 'snippet',
    maxResults: 1,
    nextPageToken: nextPageToken,
    YOUTUBE_API_KEY: 'AIzaSyDjUPq9DYoDCTbNdzgDkjDWZ3nKLd7LWhM', // process.env.REACT_APP_YOUTUBE_API_KEY;
  };
  const url = `https://www.googleapis.com/youtube/v3/search?q=${param.q}&part=${param.part}&maxResults=${param.maxResults}&key=${param.YOUTUBE_API_KEY}`; //&pageToken=${param.nextPageToken}
  //console.log(url);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  let res = await fetch(url, options);
  if (res && res.ok) {
    const resData = await res.json();
    const {title, channelId, channelTitle} = resData.items[0].snippet;
    const videoId = resData.items[0].id.videoId;
    //const {items} = resData;
    console.log({title, videoId, channelTitle, channelId});

    return {title, videoId, channelTitle, channelId};

    //return await res.json();
  }
  else {
    return -1;
  }
}
//export default get_api_res;



export async function getPlayList(search, nextPageToken) {
  let res;
  try {
    res = await get_api_res(search, nextPageToken);
  } catch (error) {
    res = await get_api_res(search, nextPageToken);
  } finally {
    if (!res) {
    }
    return {
      videoInfo: res.items.map(row => ({
        title: row.snippet.title,
        desc: row.snippet.description,
        img: row.snippet.thumbnails.default.url,
        date: row.snippet.publishTime.split('T', 1),
        videoId: row.id.videoId,
      })),
    };
  }
}

//export { getPlayList }
