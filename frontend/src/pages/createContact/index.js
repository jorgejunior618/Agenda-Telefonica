import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function ContactsList() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleCreateContact(event) {
    event.preventDefault();
    const data = {
      name,
      surname,
      phone,
      email,
    };

    try {
      const response = await api.post('contacts', data);
      alert(`Contato criado com sucesso, id do contato: ${response.data.contact.id}.`);

      history.push('/');
    } catch(err) {
      alert('Erro na criação do contato, tente novamente.');
    }
  }

  function handleCancel() {
    alert('Operação cancelada.');
    history.push('/');
  }

  return (
    <form onSubmit={handleCreateContact}>
    <header>
      <div className="container">
        <h1>Novo Contato</h1>
        <div id="actions">
          <button onClick={handleCancel} id="cancel">Cancelar</button>
          <button type="submit" id="save">Salvar</button>
        </div>
      </div>
    </header>
    <section className="container">
        <ul id="properties">
          <li>
            <label for="name">Nome:</label>
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
            <label for="surname">Sobrenome:</label>
            <input
              placeholder="Digite o Sobrenome"
              type="text"
              name="surname"
              id="surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
          </li>
          <li>
            <label for="phone">Telefone:</label>
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
            <label for="email">Email:</label>
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