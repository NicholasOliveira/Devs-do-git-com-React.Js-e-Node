import React from 'react';
import './styles.css'

function DevItem({ dev, handleDeleteDev, editRow }) {

  async function handleDeleteDev2(github_username) {
    await handleDeleteDev(github_username);
  }

  async function editRow2(dev) {
    await editRow(dev);
  }

  return (<li className="dev-item">
    <header>

      <div className="HeaderFechar">
        <img src={dev.avatar_url} alt={dev.nome} />

        <button className="editar_item" onClick={() => editRow2(dev)}>
          ( Editar )
        </button>

        <button className="delete_item" onClick={() => handleDeleteDev2(dev.github_username)}>
          ( X )
        </button>


      </div>

      <div className="user-info">
        <strong>
          {dev.name}
        </strong>
        <span>
          {dev.techs.join(', ')}
        </span>
      </div>
    </header>
    <p>
      {dev.bio}
    </p>
    <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
  </li >);
}

export default DevItem;


