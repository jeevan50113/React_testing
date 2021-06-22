import { sort } from "prelude-ls";
import { useState, useEffect } from "react";

//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Usecase() {
  const [apiData, setapiData] = useState([]);
  const [originaldata, setoriginaldata] = useState([]);
  let user = [];
  let email = [];

  const Fetch = async () => {
    const URL = `https://jsonplaceholder.typicode.com/users`;
    try {
      let data = await fetch(URL);
      setapiData(data);
      setoriginaldata(data);
      sort();
    } catch (e) {
      alert("There has been a problem with your fetch operation:");
    }
  };

  const sort = () => {
    apiData.forEach((e) => user.push(e.name));
    apiData.forEach((e) => email.push(e.email));

    var list = [];
    for (var j = 0; j < user.length; j++)
      list.push({ name: user[j], email: email[j] });

    //2) sort:
    list.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name == b.name ? 0 : 1;
      //Sort could be modified to, for example, sort on the email
      // if the name is the same.
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
      user[k] = list[k].name;
      email[k] = list[k].email;
    }
    //list.forEach((e) => console.log(e));
    setapiData(list);
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <div>
      <form onSubmit={sort}>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>username</th>
            </tr>
          </thead>
          {originaldata.map((item) => {
            return (
              <tbody key={item.username}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>username</th>
          </tr>
        </thead>
        {apiData.map((item) => {
          return (
            <tbody key={item.username}>
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
