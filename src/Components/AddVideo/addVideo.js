

function addItem(res,newVideos,termv2){
    const [{snippet:{title,thumbnails:{medium:{url}}},
            statistics:{likeCount,viewCount}}] = res.data.items


    newVideos.push({
        id: termv2,
        title: title,
        like: likeCount,
        views: viewCount,
        image: url,
        dateAdd: res.headers.date,
        favorites: false
      })
      const filterVideos = newVideos.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      return filterVideos
      
}
export default addItem;
