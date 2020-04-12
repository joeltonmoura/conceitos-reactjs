import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(r => setRepository(r.data))
  }, [])
  async function handleAddRepository() {
    const data = await api.post('repositories', {
      title: `Conceitos Basicos Reactjs ${Date.now()}`
      , url: "https://github.com/joeltonmoura/conceitos-nodejs.git"
      , techs: ["node", "git", "javaScript"]
      , likes: 0
    })

    setRepository([...repository, data.data])
  }

  async function handleRemoveRepository(id) {
    const idRepository = id
    api.delete(`repositories/${idRepository}`)
    setRepository(repository.filter(item => item.id !== idRepository))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(r =>
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
