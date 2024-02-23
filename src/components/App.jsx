import React, { useState, useEffect } from 'react';
import ContactsList from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { load, save } from 'helpers/localStorage';

const CONTACTS = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const contacts = load(CONTACTS);
    if (contacts?.length) {
      return contacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(CONTACTS, contacts);
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleChangeInput = e => {
    setFilter(e.target.value);
  };

  const getFilteredData = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const fiterData = getFilteredData(contacts);
  return (
    <div>
      <h1>Phoneboock</h1>
      <ContactForm contacts={contacts} onFormSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChangeInput} />
      <ContactsList contacts={fiterData} onDelete={deleteContact} />
    </div>
  );
}

// export default class App extends Component {
// 	state = {
// 		contacts: [],
//     filter: '',
//   }

//    componentDidMount () {
//     const contacts = load(CONTACTS);
//     if(contacts) {
//       this.setState({contacts})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if(prevState.contacts.length !== this.state.contacts.length) {
//       save(CONTACTS, this.state.contacts)
//     }
//   }

//   addContact = (newContact) => {
//     this.setState(prev => ({contacts: [...prev.contacts, newContact]}) )
//   }

//   deleteContact = (id) => {
//      this.setState(prev => ({contacts: prev.contacts.filter(contact => contact.id !== id)}) )
//   }

//   handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value })
//   }

//   getFilteredData = () => {
// 		const { filter, contacts } = this.state
// 		return contacts.filter( contact => contact.name.toLowerCase().includes(filter.toLowerCase()) )
//   }

//   render() {
//     const { contacts, filter} = this.state;
//     const fiterData = this.getFilteredData(contacts);
//     return (
//       <div>
//         <h1>Phoneboock</h1>
//         <ContactForm contacts={contacts} onFormSubmit={this.addContact}/>
//         <h2>Contacts</h2>
//         <Filter filter={filter} onChange={this.handleChangeInput}/>
//         <ContactsList contacts={fiterData} onDelete={this.deleteContact}/>
//     </div>
//   );
//   }
// }
