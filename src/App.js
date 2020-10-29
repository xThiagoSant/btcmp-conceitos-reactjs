import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/repositories').then( response => {      
      setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const {data} = await api.post('/repositories', {
      title:`Project ${Date.now()}`,
      url:"https://github.com/xThiagoSant/btcmp-conceitos-reactjs"
    })
    setProjects([...projects, data])
  }

  async function handleRemoveRepository(id) {
    /*
    ATENÇÃO THIAGO!!!!!!!!!!
    Eu tinha feito "CERTO", até que funciona MASSSSSS, aprendi nesta lição que, não devo pensar como desktop, não estou numa rede local,
    estou numa internet, onde um GET custa caro! então minha primeira solução se fosse um projeto grande
    custaria ao trazer novamente uma nova lista só por que apaguei uma delas.

    A solução do diego foi melhor, ele já tiha a lista e filtrou tudo removendo apenas o ID que já tinha sido
    passado na chamada da função! não sendo necessário uma nova chamada a API. 

    const {status} = await api.delete(`/repositories/${id}`)
    if(status === 204) {
      const {data} = await api.get('/repositories')
      setProjects(data)
    }
    */

   api.delete(`/repositories/${id}`)
   setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map( project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}> Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
