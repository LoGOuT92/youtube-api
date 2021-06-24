import { useState } from 'react';
import './App.css';
import Content from './Components/Conntent/Content';
import Form from './Components/Form/Form';
import axios from 'axios';

function App() {
  const apiKey = "AIzaSyDF-Zun-FAf-vb2GwJvAXK3KV2VOqn2G3I"
  const [term, setTerm]=useState('')
  const [videos,setVideos]=useState([])

  const onChangehandler=(e)=>{
    setTerm(e.target.value)
    
  }
  const onSubmithandler= async (e)=>{
    e.preventDefault();
    
    let termv2 = term.substr(term.length - 11);
    try{
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${termv2}&key=${apiKey}&part=snippet,statistics&fields=items(id,snippet,statistics)`)

      const currentdate = new Date(); 
      const datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                    

      const newVideos = [...videos]
      newVideos.push({
        id: termv2,
        title: res.data.items[0].snippet.title,
        like: res.data.items[0].statistics.likeCount,
        views: res.data.items[0].statistics.viewCount,
        image: res.data.items[0].snippet.thumbnails.medium.url,
        dateAdd: datetime
      })
      let filetVideos = newVideos.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      setVideos(filetVideos)
      setTerm("")
      
      } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
  }}
  
  function handleRemove(id) {
    const newList = videos.filter(x => x.id !== id);
    setVideos(newList);
  }

  return (
    <div className="App">
        <Form 
          term={term}
          onSearch={onChangehandler}
          onSubmit={onSubmithandler}
        />
      <ul>{videos.map(video=><Content key={video.id}{...video} handleRemove={() => handleRemove(video.id)}/>)}</ul>
    </div>
  );
}

export default App;