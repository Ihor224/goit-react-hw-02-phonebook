import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './Components/ContactList';
import ContactForm from './Components/ContactForm';
import Filter from './Components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = ({ name, number }) => {
    console.log({ name, number });

    const phone = {
      id: uuidv4(),
      name,
      number,
    };

    this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [phone, ...prevState.contacts],
        }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedPhone = filter.toLowerCase();
    return contacts.filter(phone =>
      phone.name.toLowerCase().includes(normalizedPhone),
    );
  };

  render() {
    const { filter } = this.state;

    const filteredPhones = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredPhones}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
