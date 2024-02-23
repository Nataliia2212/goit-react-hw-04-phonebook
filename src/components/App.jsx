import React, { Component } from 'react';
import ContactsList from './ContactsList/ContactsList'
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import {load, save} from 'helpers/localStorage';

const CONTACTS = 'contacts';

export default class App extends Component {
	state = {
		contacts: [],
    filter: '',
  }
  
   componentDidMount () {
    const contacts = load(CONTACTS);
    if(contacts) {
      this.setState({contacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts.length !== this.state.contacts.length) {
      save(CONTACTS, this.state.contacts)
    }
  }
  
  addContact = (newContact) => {
    this.setState(prev => ({contacts: [...prev.contacts, newContact]}) )
  }

  deleteContact = (id) => {
     this.setState(prev => ({contacts: prev.contacts.filter(contact => contact.id !== id)}) )
  }
  
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  getFilteredData = () => {
		const { filter, contacts } = this.state
		return contacts.filter( contact => contact.name.toLowerCase().includes(filter.toLowerCase()) )
  }

  render() {
    const { contacts, filter} = this.state;
    const fiterData = this.getFilteredData(contacts);
    return (
      <div>
        <h1>Phoneboock</h1>
        <ContactForm contacts={contacts} onFormSubmit={this.addContact}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChangeInput}/>
        <ContactsList contacts={fiterData} onDelete={this.deleteContact}/>
    </div>
  );
  }
}


