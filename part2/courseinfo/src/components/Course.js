const Header = ({ courseName }) => {
    return (
      <h2>{courseName}</h2>
     );
  }
  
  const Content = ({ parts }) => {
    //initialize a variable to store total exercises after applying reduce on the array of objects
    const total = parts.reduce((initial, part) => {
      return initial + part.exercises
    },0)
    return (
      <div>
      <Part parts = {parts} />
      <h3>total of { total } exercises</h3>
      </div>
     );
  }
  
  const Part = ({ parts }) => {
    //array of objects is mapped through to produce the name and exercises at each iteration
    return (
      <div>{
        parts.map(part => {
        return <p key = { part.id }>{ part.name }  { part.exercises }</p>
      })
      }
      </div>
     );
  }
  
  
  const Course = ({ course }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
      <Header courseName = {course[0].name}/>
      <Content parts = {course[0].parts}/>
      <Header courseName = {course[1].name}/>
      <Content parts = {course[1].parts}/>
      </div>
     );
  }
    
  export default Course;