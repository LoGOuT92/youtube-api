import { useState } from 'react';
import './App.css';
import Content from './Components/Conntent/Content';
import Form from './Components/Form/Form';
import axios from 'axios';

function App() {

  const [term, setTerm]=useState('')
  const [videos,setVideos]=useState(
    [])

  const onChangehandler=(e)=>{
    setTerm(e.target.value)
  }
  const onSubmithandler= async e=>{
    e.preventDefault();
    if(term.length<11){
      return alert("Musisz poodac albo ID albo caly link!")
    }else{

    
    let termv2 = term.substr(term.length - 11);
    const apiKey = ""
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${termv2}&key=${apiKey}&part=snippet,statistics&fields=items(id,snippet,statistics)`)
    const newVideos = [...videos]

    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    newVideos.push({
      id: termv2,
      title: res.data.items[0].snippet.title,
      like: res.data.items[0].statistics.likeCount,
      views: res.data.items[0].statistics.viewCount,
      image: res.data.items[0].snippet.thumbnails.medium.url,
      dateAdd: datetime
    })
    setVideos(newVideos)
  }
  }

  function handleRemove(id) {
    const newList = videos.filter((item) => item.id !== id);
 
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