import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import scripts from './script'


export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('contacts').then(response => {
      setContacts(response.data)
    })
  }, []);

  async function handleDelete() {
    const [exclude] =  document.querySelectorAll("#contactProperties button");

    const id = Number(exclude.getAttribute('key'));
    if(id) {
      try {
        await api.delete(`contacts/${id}`);
        alert('Contato excluido com sucesso.');
        setContacts(contacts.filter(contact => contact.id !== id))
      } catch (err) {
        alert('Ocorreu um erro ao deletar o contato, tente novamente.');
      }
    } else {
      alert('Selecione o contato que deseja remover.');
    }
  }

  function handleUpdate(){
    const [update] =  document.querySelectorAll("#contactProperties button");

    const id = Number(update.getAttribute('key'));

    if(id) {
      const upContact = contacts.filter(contact => contact.id === id);

      localStorage.setItem("id", id);
      localStorage.setItem("name", upContact[0].name);
      localStorage.setItem("surname", upContact[0].surname);
      localStorage.setItem("phone", upContact[0].phone);
      localStorage.setItem("email", upContact[0].email);
      history.push('/contact');
    } else {
      alert('Selecione o contato que deseja alterar.');
    }
  }
  
  return (
    <div>
    <header>
      <div className="container">
        <h1>Agenda Telefônica</h1>
        <Link to="/contact/new" className="newContact">Novo Contato</Link>
      </div>
    </header>
    <section className="container" id="contacts">
      <ul id="contactsList">

        {contacts.map(contact => (
          <li key={contact.id}>
          <span>{contact.name}</span> <span>{contact.surname}</span><br/>
          telefone: <span>{contact.phone}</span> - email: <span>{contact.email||'---'}</span>
          <span style={{display: "none"}}>{contact.id}</span>
        </li>
        ))}
        
      </ul>

      <ul id="contactProperties">
        <li>nome: <span></span></li>
        <li>sobrenome: <span></span></li>
        <li>telefone: <span></span></li>
        <li>email: <span></span></li>

        <button onClick={handleUpdate} id="update">Atualizar Contato</button>
        <button onClick={handleDelete} id="exclude">Excluir Contato</button>

      </ul>
    </section>
    <script src={scripts}></script>
    </div>
  );
}