const Persons = ({persons, nameToFilter, handleDelete}) => {
    const filtered = persons.filter(person => {
        return person.name.toLowerCase().includes(nameToFilter.toLowerCase())
      });
    return ( 
        <div>
          { filtered.map(person => <p key={person.name}>{ person.name } {person.number}
           <button onClick = {() => handleDelete(person.id)}>delete</button></p> )}
        </div>
     );
}
 
export default Persons;