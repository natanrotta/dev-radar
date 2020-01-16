//Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação;
//Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
//Propriedade: Informações que um componente PAI passa para um componente FILHO; 

/*
    Obs: Quando criamos algum componente e ele possui algumas propriedades,
    como: Title, podemos acessar ela através do {props.title} em um outro componente, que 
    recebe o props por parâmetro;

    -Toda função que é própria de um componente, devemos criar ela dentro do mesmo;
    Ex de estado: 
    const [counter, setCounter] = useState(0);

    function incrementar() {
      setCounter(counter + 1);
    }

    return (
      <>
        <h1>Contador: {counter}</h1>
        <button onClick={incrementar}>Incrementar</button>
      </>
    );
*/

import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem/index';
import DevForm from './components/devForm/index';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    //Ao inserir ele me retorna o dev cadastrado, devo pegar ele e colocar no final da minha lista de dev;
    //Eu preciso criar meu array, carregar todos os devs que lá estão e depois adicionar novo;
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return (
              <DevItem key={dev._id} dev={dev} />
            )
          })}

        </ul>

      </main>
    </div>

  );
}

export default App;
