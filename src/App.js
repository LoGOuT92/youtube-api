import { useState,useEffect } from 'react';
import './App.css';
import Content from './Components/Conntent/Content';
import Form from './Components/Form/Form';
import axios from 'axios';
import addItem from './Components/AddVideo/addVideo';
import apiKey from './ApiKey';

function App() {
  
  const [term, setTerm]=useState('')
  const [videos,setVideos]=useState([])
  const [favorites,setFavorites]=useState([])
  const [isCheckd,setIsCheckd]=useState(false)

  const baseURL = {
    base: 'https://www.googleapis.com/youtube/v3/videos?id=',
    params: '&part=snippet,statistics&fields=items(id,snippet,statistics)'
  }
  
  const onChangehandler=(e)=>{
    setTerm(e.target.value)
  }

  const onSubmithandler= async (e)=>{
    e.preventDefault();
    const {base,params}=baseURL;
    const idVideo = term.substr(term.length - 11);

    try{
      const res = await axios.get(`${base}${idVideo}&key=${apiKey}${params}`)
      setVideos(addItem(res,videos,idVideo))
      setTerm("")
      } catch (error) {
        if (error.response) {
            console.log(error.response.status);
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
  function addToFav(id) {
    videos.forEach(x =>{if(x.id===id){x.favorites=!x.favorites}})
    const newArray=[...videos]
    setVideos(newArray)
  }

  useEffect(() => {
    return () => {
      const newArray=videos.filter(x => x.favorites === true)
      setFavorites(newArray)
    }
  }, [videos])

  function shovFav(e){
    setIsCheckd(e.target.checked)
  }
  function clearList(){
    setVideos([])
  }


  return (
    <div className="App">
        <Form 
          term={term}
          onSearch={onChangehandler}
          onSubmit={onSubmithandler}
          clearList={clearList}
          shovFav={shovFav}
        />
      <ul>
        {isCheckd?(favorites.map(
        x=><Content key={x.id}{...x}
         handleRemove={() => handleRemove(x.id)}
         addToFav={() => addToFav(x.id)}
         />)):(
          videos.map(
            x=><Content key={x.id}{...x}
             handleRemove={() => handleRemove(x.id)}
             addToFav={() => addToFav(x.id)}
             />)
         )}
      </ul>
    </div>
  );
}

export default App;