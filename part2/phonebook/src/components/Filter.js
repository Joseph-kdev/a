const Filter = ({name, handler}) => {
    return ( 
        <div>
         filter shown with <input  value={name} onChange={handler}/>
        </div>
     );
}
 
export default Filter;