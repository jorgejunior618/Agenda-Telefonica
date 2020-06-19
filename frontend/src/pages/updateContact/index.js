import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css'

export default function ContactsList() {
  const [contact, setContact] = useState([]);
  const userId = Number(localStorage.getItem('id'));
  const history = useHistory();

  const [name, setName] = useState(localStorage.getItem('name'));
  const [surname, setSurame] = useState(localStorage.getItem('surname'));
  const [phone, setPhone] = useState(localStorage.getItem('phone'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const oldName = localStorage.getItem('name');
  const oldSurname = localStorage.getItem('surname');

  async function handleUpdateContact(event) {
    event.preventDefault();
    const data = {
      name,
      surname,
      phone,
      email,
    };

    try {
      const response = await api.put(`contacts/${userId}`, data);
      alert(`Contato atualizado com sucesso`);
      
      localStorage.clear();
      history.push('/');
    } catch(err) {
      alert('Erro na criação do contato, tente novamente.');
    }
  }
  
  function handleCancel() {
    localStorage.clear();
    alert('Operação cancelada.');
    history.push('/');
  }

  return (
    <form onSubmit={handleUpdateContact}>
    <header>
      <div className="container">
        <h1>{`${oldName} ${oldSurname}`} </h1>
        <div id="actions">
          <button onClick={handleCancel} id="cancel">Cancelar</button>
          <button type="submit" id="save">Salvar</button>
        </div>
      </div>
    </header>
    <section className="container">
    <ul id="properties">  
      <li>
        <label htmlFor="name">Nome:</label>
        <input
          required
          placeholder="Digite o Nome"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </li>

      <li>
        <label htmlFor="surname">Sobrenome:</label>
        <input
          placeholder="Digite o Sobrenome"
          type="text"
          name="surname"
          id="surname"
          value={surname}
          onChange={e => setSurame(e.target.value)}
        />
      </li>

      <li>
        <label htmlFor="phone">Telefone:</label>
        <input
          required
          placeholder="Digite o Telefone"
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </li>

      <li>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Digite o Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </li>
    </ul>
    </section>
    </form>
  );
}