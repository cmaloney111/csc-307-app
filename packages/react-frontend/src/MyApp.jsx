import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => { console.log(error); });
  }, [] );

  function removeOneCharacter(index) {
    let user_id = -1;
    const updated = characters.filter((character, i) => {
      if (i == index) {
        user_id = character["_id"];
      }
      return i !== index;
    });
    deleteUser(user_id)
      .then(res => res.status)
      .then(status => {
        if (status == 204) {
          setCharacters(updated);
        }
      })
      .catch((error) => { console.log(error); });
  }

  function updateList(person) {
    postUser(person)
      .then(res => {
        if (res.status == 201) {
          return res.json();
        }
        else {
          return;
        }
      })
      .then(res => {
          setCharacters([...characters, res]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person), 
    });

    return promise;
  }

  function deleteUser(id) {
    let uri = `http://localhost:8000/users/${id}`;
    const promise = fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      } 
    });

    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
      
    </div>
  );
}

export default MyApp;