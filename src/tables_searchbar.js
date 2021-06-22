import { useState, useEffect } from "react";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Usecase() {
  const [apiData, setapiData] = useState([]);
  const [input, setinput] = useState("");
  
  
  
  useEffect(() => {
    
  fetch('https://jsonplaceholder.typicode.com/posts') 
 .then((response) => {
   if (response.ok) { 
    return response.json();
   }
   return Promise.reject(response); 
 })
 .then((data) => setapiData(data))
 .catch((error) => {
   console.log('Something went wrong.', error); 
 });
    
    
    
    
  //  fetch("https://jsonplaceholder.typicode.com/users")
  //    .then((res) => res.json())
   //   .then((data) => setapiData(data))
   //   .catch((error) => {
   //     error.alert("invalid link");
    //  });
    
    // const info = await data.json();
    // console.log(info);
  });

  return (
    <div>
      <input
        className="Input"
        type="text"
        id="header-search"
        placeholder="Search id or title"
        name="s"
        onChange={(e) => {
          setinput(e.target.value);
        }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        {apiData
          .filter((item) => {
            if (input == "") {
              return item;
            } else if (
              item.id == input ||
              item.title.toLowerCase().includes(input.toLowerCase())
            ) {
              // filter based on title text and id number
              return item;
            }
          })
          .map((item) => {
            return (
              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}
