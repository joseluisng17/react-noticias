import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';
import Error from './components/Error';


function App() {

  // definir la categoria y noticias
  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=7cdd3ae556cd4c4aa34e4254eb8ccb80`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();

      //console.log(noticias)
      guardarNoticias(noticias.articles);

       // Detecta si hubo resultados correctos en la consulta

      if(noticias.totalResults === 0) {
        guardarError(true);
      } else {
        guardarError(false);
      }

    }
    consultarAPI();
  }, [categoria]);

  let componenteListadoNoticias;
  if(error) {
    componenteListadoNoticias = <Error mensaje="No hay resultados" />
  } else {
    componenteListadoNoticias = <ListadoNoticias 
                  noticias={noticias}
                />
  }

  return (
    <Fragment>
        <Header 
          titulo='Buscador de Noticias'
        />

        <div className="container white">
            <Formulario 
              guardarCategoria={guardarCategoria}
            />

            {componenteListadoNoticias}
        </div>
    </Fragment>
  );
}

export default App;
