import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
function App() {

  const [state, setState] = useState({posts: []})

const consultarCep = (e) => {
    e.preventDefault()

    let cep = document.getElementById("cep").value // Pega o campo cep

    Axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
      console.log(response)
      
      if(response.data.erro === true) {
       
        document.getElementById("alerta").style.visibility = "visible"
      }

      else {

        document.getElementById("alerta").style.visibility = "hidden"

      setState({
        posts: response.data
      })
    }
  
    }).catch((err) => {
        console.log(err)
    })

   

setState(state)

}

const handleChange = (e) => {
  setState({...state, [e.target.name]: e.target.value})
}

const {posts} = state

 return (
  <div className="App">
    <br/>
   <h1>CEP Fácil <i class="fa fa-map-marker" aria-hidden="true"></i></h1>
   <h5>Jeito simples e rápido de achar seu endereço</h5>
   <br/>
   <div className="container">
     <div className="row">
       <div className="col-md">
         <div className="card">
           <div className="card-body">
    <form>
      <label>CEP : </label><input autofocus="on" className="form-control" onChange={handleChange} type="text" 
      placeholder="Digite o Cep" name="cep" id="cep"></input>
         <br></br>
         <button className="btn btn-primary" onClick={consultarCep}>CONSULTAR</button>
       </form>
       </div>
       </div>

       </div>
   

<div className="col-md">
 <h4><font color="green">Cidade :</font> {posts.localidade}</h4> 
 <br/>
 <h4><font color="green">UF : </font>{posts.uf}</h4> 
 <br/>
 <h4><font color="green">Logardouro : </font>{posts.logradouro}</h4> 
 <br/>
 <h4><font color="green">Bairro : </font>{posts.bairro}</h4> 
       </div>
       </div>
     
</div>       
<div class="col-md">
<div class="alert alert-danger" role="alert" id="alerta">
    Esse CEP não foi encontrado tente novamente!
</div>
</div>
    </div>
  );
}

export default App;
