import React from 'react'
import SearchForm from './SearchForm.jsx'
import Player from './Player.jsx'
import './stylesheets/App.css'
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [content, setContent] = React.useState({
    image: "https://www.basketball-reference.com/req/202106291/images/headshots/jamesle01.jpg",
    games: 0,
    points: 0,
    trb: 0,
    ast: 0,
    stl: 0,
    blk: 0
});

  const searchName = async (params) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`http://localhost:3000/api?${queryString}`)
    .then((res) => res.json())
      .then((json) => setContent(json))
      .catch((error) => console.log(error));

    console.log(content)
  }

  return (
    <>
      <h1 className="text-center">Welcome to the app! Type in an NBA Player</h1>
      <Player player={content}/>
      <SearchForm parentCallback={searchName} />
    </>
  )
}

export default App
