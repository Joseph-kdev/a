const PersonForm = ({ name, handleName, newNumber, handleNumber, clickHandler , text}) => {
    return (
    <form onSubmit={clickHandler}>
        <div>
          name: <input value = {name} onChange={handleName}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div>
          <button type="submit" onClick={clickHandler}>{text}</button>
        </div>
      </form>
     );
}
 
export default PersonForm;