import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState(0);
  const [newBook, setNewBook] =useState("");

  const [bookList, setBookList] = useState([]);

  useEffect(() =>
  {
    Axios.get("http://localhost:8080/read").then((response) => {
      console.log(response);
      setBookList(response.data);
    });
  }, []);

  const addBooks = () => {
    Axios.post("http://localhost:8080/insert", {
      name : name,
      type: type,
      year: year,
    });

  };

 const doUpdate = (id) => {
  Axios.put("http://localhost:8080/update", {
    id: id,
    newBook: newBook,
  } );
 };
 
 const doDelete = (id) => {
  Axios.delete(`http://localhost:8080/delete/${id}`) };

  return (
    <div className="App">

   <h1> MERN STACK CRUD APP</h1>
   <label> BOOK NAME:</label>
   <input type = "text"  onChange={(event) => {
     setName(event.target.value); } }/> <br></br>
   <label>  BOOK TYPE:</label>
   <input type = "text" onChange={(event) => {
     setType(event.target.value); } }/><br></br>
   <label>PUBLISH YEAR:</label>
   <input type = "number" onChange={(event) => {
     setYear(event.target.value); } }/><br></br>
   
<button onClick={addBooks}> ADD BOOK</button>

<h3> BOOKLIST</h3>
{ bookList.map((val,key) => {
  return (
  <div>
     <h4> {val.name} </h4>
     <h4> {val.type} </h4>
     <h4> {val.year} </h4>
     <input type = "text"  placeholder="Enter New Book" onChange={(event) => {
     setNewBook(event.target.value); } } />
     <button onClick={() => doUpdate(val._id)}>UPDATE</button>
     <button onClick={() => doDelete(val._id)}>DELETE</button>
   </div>
  )})}
   
    </div>
  )
}

export default App;
