import React, { useState, useEffect } from 'react';
import './styles.css'

function DevUpdate({ handleUpdateDev, currentUser }) {

  const [github_username, setGithub_username] = useState(currentUser.github_username);
  const [name, setName] = useState(currentUser.name);
  const [techs, setTechs] = useState(currentUser.techs);
  const [bio, setBio] = useState(currentUser.bio);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleUpdateDev2(e) {
    e.preventDefault();

    await handleUpdateDev({
      github_username,
      name,
      techs,
      bio,
      latitude,
      longitude,
    });
    setGithub_username('');
    setTechs('');
  }

  return (
    <form onSubmit={handleUpdateDev2} >
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="Nome">Nome</label>
        <input
          name="name"
          id="name"
          required
          value={name ? (name) : ('')}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs ? (techs) : ('')}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="bio">Biografia</label>
        <input
          name="bio"
          id="bio"
          required
          value={bio ? (bio) : ('')}
          onChange={e => setBio(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            type="number"
            id="latitude"
            required
            value={latitude ? (latitude) : ('')}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            type="number"
            id="longitude"
            required
            value={longitude ? (longitude) : ('')}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>

    </form >
  );
}

export default DevUpdate;
