import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('contacts').then(response => {
      setContacts(response.data)
    })
  }, []);

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
  async function handleDelete() {
    const [exclude] =  document.querySelectorAll("#contactProperties button");

    const id = Number(exclude.getAttribute('key'));
    if(id) {
      try {
        await api.delete(`contacts/${id}`);
        alert('Contato excluido com sucesso.');
        setContacts(contacts.filter(contact => contact.id !== id));

        const displayProperties = document.querySelectorAll("#contactProperties li span");
        displayProperties.forEach((propertie) => {
          propertie.style.color = '#F0F0F5';
        });
      } catch (err) {
        alert('Ocorreu um erro ao deletar o contato, tente novamente.');
      }
    } else {
      alert('Selecione o contato que deseja remover.');
    }
  }


  function activateItem(element) {
    const contact = element.currentTarget;
    const contactProperties = contact.querySelectorAll("span");
    const id = contactProperties[contactProperties.length-1].innerText;

    const contactsList = document.querySelectorAll("#contactsList li");
    const displayProperties = document.querySelectorAll("#contactProperties li span");
    const buttons =  document.querySelectorAll("#contactProperties button");

    contactsList.forEach(contact => {
      contact.className = '';
    });
    contact.className = 'active';

    displayProperties.forEach((propertie) => {
      propertie.style.color = '#F0F0F5';
    });

    buttons.forEach(button => {
      button.setAttribute('key', id);
    });

    setTimeout( () => {
      displayProperties.forEach((propertie, index) => {
        propertie.innerText = contactProperties[index].innerText;
        propertie.style.color = '#000';
      });
    }, 400);
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
          <li onClick={(event) => activateItem(event)} key={contact.id}>
          <span>{contact.name} </span>
          <span>{contact.surname}</span>
          <br/>
          telefone: <span>{contact.phone}</span> - 
          email: <span>{contact.email||'---'}</span>
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
    </div>
  );
}