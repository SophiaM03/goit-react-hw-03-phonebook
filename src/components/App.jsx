import React, { Component } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import styled from 'styled-components';
import { Section } from './Section/Section';
import { searchContacts } from 'utils/searchContacts';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChangeFilter = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
    if (
      contacts.some(
        ({ name, number }) => name === contact.name || contact.number === number
      )
    ) {
      alert(
        `${contact.name} already in contacts! Check contact name or number`
      );
      return true;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
    return false;
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = searchContacts(contacts, filter);
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm addContact={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <Filter changeFilter={this.handleChangeFilter} />
          <ContactList
            onDeleteContact={this.handleDeleteContact}
            contacts={filteredContacts}
          />
        </Section>
      </Container>
    );
  }
}
