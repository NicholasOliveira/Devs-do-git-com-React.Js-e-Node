import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem'
import DevAdd from './components/DevForm/DevAdd'
import DevUpdate from './components/DevForm/DevUpdate'

function App() {
  const [devs, setDevs] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, nome: '', github_username: '', bio: '', techs: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [devs])

  async function handleAddDev(data) {
    await api.post('/devs', data)
  }

  const editRow = dev => {
    setEditing(true)
    setCurrentUser({ github_username: dev.github_username, name: dev.name, techs: dev.techs, bio: dev.bio });
  }

  async function handleUpdateDev(dev) {
    setEditing(false)
    await api.put(`/update?github_usernam=${dev.github_username}&name=${dev.name}&Techs=${dev.techs}&bio=${dev.bio}`);
  }

  async function handleDeleteDev(github_username) {
    await api.delete(`/delete?github_username=${github_username}`)
    const AtualizaDevs = devs.filter(element => element.github_username !== github_username);
    setDevs(AtualizaDevs);
  }


  return (
    <div id="app">
      {editing ? (
        <aside>
          <strong>Editar User</strong>
          <DevUpdate
            editing={editing}
            setEditing={setEditing}
            currentUser={currentUser}
            handleUpdateDev={handleUpdateDev} >
          </DevUpdate>
        </aside>
      ) :
        (<aside>
          <strong>Cadastrar</strong>
          <DevAdd handleAddDev={handleAddDev} >
          </DevAdd>
        </aside>
        )}



      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDeleteDev={handleDeleteDev} editRow={editRow} />
          ))}
        </ul>
      </main>
    </div>
  );

}

export default App;
