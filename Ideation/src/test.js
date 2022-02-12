const Addkeyword = keyword => {
    const [params, setParams] = useState({
      key: 'AIzaSyAB5zzmM9t57kbVVoSZhFSsKqOfxn3hfew',
      part: 'snippet',
      q: keyword,
      maxResults: 10,
      type: 'video',
      order: 'viewCount',
    });
    const [imageList, setImageList] = useState([]);
    axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
    axios
      .get('./search', {params})
      .then(response => {
        if (!response) {
          console.log('response 실패');
          return;
        } else {
          let i = 0;
          for (i = 0; i < params.maxResults; i++) {
            image = response.data.items[i].snippet.thumbnails;
            setImageList([...imageList, image]);
          }
        }
      })
      .then(response => {
        console.log('YoutubeAPI success');
        firestore()
          .collection('categoryData')
          .doc('item')
          .collection(keyword)
          .doc()
          .set({
            keyword: keyword,
            data: imageList,
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getYoutubeApi = () => {
    keyword.map(k => Addkeyword.Addkeyword(k.label));
  };
  console.log('시작');
  getYoutubeApi();