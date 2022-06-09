import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [updateName, setUpdatedName] = useState('');
  const [updateReview, setUpdatedReview] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      name: movieName,
      desc: review
    }).then(() => {
      alert("submit success");
    });

    setMovieList([
      ...movieList,
      { movieName: movieName, movieReview: review}
    ]);
  }

  const deleteReview = (MovieID) => {
    Axios.delete('http://localhost:3001/api/delete/'+MovieID);
  }

  const updateMovie = (MovieID) => {
    Axios.put('http://localhost:3001/api/update/'+MovieID, {
      name: updateName,
      desc: updateReview
    }).then(() => {
      alert("update success");
    });

    setUpdatedName("")
    setUpdatedReview("")
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>REACT CRUD APP</h1>

      <div className= "form_a">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => {
          setReview(e.target.value)
        }}/>
        <button onClick={submitReview}>Submit</button>
        {movieList.map((val) => {
          return(
            <div className="card" key={val.id}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h1>{val.movieName}</h1><hr/>
                      <p>{val.movieReview}</p><hr/>
                      <button onClick={() => {deleteReview(val.id)}}>Delete</button>
                    </td>
                    <td>
                      <input type="text" name="updateName" placeholder="Set new Name" 
                      onChange={(e) => {
                        setUpdatedName(e.target.value)
                      }}/><hr/>
                      <input type="text" name="updateReview" placeholder="Set new review"
                      onChange={(e) => {
                        setUpdatedReview(e.target.value)
                      }}/><hr/>
                      <button onClick={() => {updateMovie(val.id)}}>Update</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
