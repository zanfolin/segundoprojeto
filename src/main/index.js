import React, { Component } from 'react';

// import { Container } from './styles';

export default class main extends Component {
    constructor(props) {
        super(props);

        this.state = { lista: [], tarefa: '', erro: '', excluir: ''};

        this.validaFormulario = this.validaFormulario.bind(this);
        this.removerItem = this.removerItem.bind(this);

    }

    validaFormulario(e) {
        e.preventDefault();

        if(this.state.tarefa.length<=0){
            //alert('entre com algum valor para tarefa');
            this.setState({erro: 'Entre com algum valor para a Tarefa'});
            return;
        }

        const novoItem = {
            id: Date.now(),
            tarefa: this.state.tarefa
        }

        this.setState(state => ({
            lista: state.lista.concat(novoItem),
            erro: '',
            tarefa: ''
        }));
    }

    removerItem(id, e) {
        if(id<=0){
            this.setState({erro: 'não há item a excluir'});
            return;
        }

        /*console.log(id);
        console.table(this.state.lista);*/

        const listaFiltrada = this.state.lista.filter( item => item.id !== id);

        this.setState({
            lista: listaFiltrada,
            erro: '',
        })
    }
    

  render() {
    return (
        <div>
            <h3>Tarefas</h3>
            <ul>
                {
                    this.state.lista.map(
                        item => (
                            <li key={item.id}>
                                {item.tarefa}
                                <button
                                 onClick={(e) => this.removerItem(item.id, e)}>
                                    Remover
                                </button>
                            </li>
                        )
                    )
                }
            </ul>
            <form onSubmit={this.validaFormulario} >
                <label htmlFor="tarefa">
                    Indique a Tarefas
                </label><br/>
                <input id="tarefa"
                 onChange={ (e) => { this.setState({tarefa: e.target.value})}}
                 value={this.state.tarefa} /><br />
                <button>
                    Adicionar Lista
                </button>  
                <button onClick={(e) => ( this.setState({lista: []}))}>
                    Limpar Lista
                </button>
                <button onClick={(e) => ( console.table(this.state.lista))}>
                    Console
                </button><br/>
                {/* <label>{this.state.tarefa}</label><br/>*/ }
                <label>{this.state.erro}</label>
            </form>
        </div>
        );
  }
}
