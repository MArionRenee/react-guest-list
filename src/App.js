import React, { useEffect, useState } from 'react';

import Party from './Party.png';
// import GuestList from './GuestList';
import './App.css';
// import uuidv4 from 'uuid/v4';

function App() {
  const [guests, setGuests] = useState([]);
  // const guestNameRef = useRef();

  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`https://marionsguestlist.herokuapp.com/`);
      const data = await response.json();
      setGuests(data);

      // console.log(data);
    };

    getGuests();
  }, []);

  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    async function newGuest() {
      const response = await fetch(`https://marionsguestlist.herokuapp.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname,
        }),
      });
      const createdGuest = await response.json();

      window.location.reload(false);
    }

    newGuest();
  };

  const [checkboxes, setCheckboxes] = React.useState({});

  const checkboxKeys = Object.keys(checkboxes);

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(
        `https://marionsguestlist.herokuapp.com/${checkboxKeys}`,
        {
          method: 'DELETE',
        },
      );
      const deletedGuest = await response.json();

      window.location.reload(false);
    }
    deleteGuest();
  }

  function handleEdit(id) {
    async function editGuest() {
      const response = await fetch(
        `https://marionsguestlist.herokuapp.com/${checkboxKeys}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ attending: true }),
        },
      );
      const editGuest = await response.json();

      window.location.reload(false);
    }
    editGuest();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ width: '290px', height: '200px' }}
          src={Party}
          alt="Party-Logo"
        />
        <br />
        <h1>
          <span role="img">🎉 </span> COME TO OUR EVENT!
        </h1>
        <br />
      </header>
      <form onSubmit={handleSubmit}>
        <p>Tell us your name please...</p>
        <label>Your first name: </label>
        <input
          type="text"
          id="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <br />
        <label>Your last name: </label>
        <input
          type="text"
          id="lastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />

        <p>
          <button>Put my name on the list!</button>
        </p>
      </form>
      <h2 className="guestlist">These folks will come:</h2>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>First click please:</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attendance</th>
            <br></br>
          </tr>
          {guests.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxes[item.id]}
                  onChange={() => {
                    setCheckboxes({ ...checkboxes, [item.id]: true });
                    // toggle = checkboxes;
                  }}
                />
              </td>

              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{JSON.stringify(item.attending)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <label>
          <br></br>
          <br></br>
          <button
            type="button"
            onClick={(item) => handleDelete(item.id)}
            id="delete"
          >
            Sorry, I won´t come!
          </button>
        </label>

        <label>
          <button
            type="button"
            onClick={(item) => handleEdit(item.id)}
            id="delete"
          >
            Yes, I will attend!
          </button>
        </label>
      </p>
    </div>
  );
}

export default App;
