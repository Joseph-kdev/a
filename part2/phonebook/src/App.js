import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import contactService from './services/contacts'
import './index.css'

//notification component
const Notification = ( {message} ) => {
  if ( message === null) {
    return null
  }

  if(message.includes('failed')) {
    return (
      <div className='failure'>
        { message }
      </div>
    )
  }
  return (
    <div className='success'>
      { message }
    </div>
  )
}

const App = () => {
  // Set initial state for persons array, new name input, phone number input,
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')
  const [message, setMessage] = useState('')

  //fetch from json server
  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  // Handle form submission to add new person to phonebook
  const addNote = (event) => {
    event.preventDefault()
    const newNameObj = { name : newName, number : number}

    // Check if entered name already exists in phonebook
    const enteredName = persons.find(person => person.name === newNameObj.name)

    // Add new person to phonebook or update existing phone number
    if (!enteredName) {
      contactService
        .create(newNameObj)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNumber('')
          setMessage( `added ${newContact.name}`)
        })
    } else {
       // Prompt user to confirm if they want to update the phone number for the contact
      const confirmUpdate = window.confirm(
      `${newNameObj.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedContact = { ...enteredName, number}
        const id = updatedContact.id

        contactService
        .update(id, updatedContact)
        .then(updatedContact => {
          setPersons(persons.map(person => person.id !== id ? person : updatedContact))
          setNewName('')
          setNumber('')
          setMessage( `updated ${updatedContact.name}'s number` )
        })
        .catch(error => {
        setMessage(
        `information of ${persons.find(p => p.id === id).name} was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
      }
    }
  }

  // Handle input change for new name input
  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  // Handle input change for phone number input
  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  // Handle input change for filter input
  const handleFilter = (event) => {
    setNameToFilter(event.target.value);
  };

  const handleDelete = id => {
    if (window.confirm("Do you really want to delete this contact?")) {
      contactService
        .deleteContact(id)
        .then(response => {
          setMessage(`deleted ${persons.find(p => p.id === id).name}`)
          console.log(message);
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter name = {nameToFilter} handler = {handleFilter} />
      <h3>Add New</h3>
      <PersonForm name = {newName} handleName = {handleInput} newNumber = {number} handleNumber = {handleNumber} clickHandler = {addNote} text = 'add'/>

      <h2>Numbers</h2>
      <Persons persons = {persons} nameToFilter = {nameToFilter} handleDelete = { handleDelete } />
    </div>
  )
}

export default App