const Header = (header) => {
  return (
    <h1>{header.course}</h1>
   );
}

const Part = (parts) => {
  return ( 
    <div>
    <p>{parts.part1} {parts.exercises1}</p>
    <p>{parts.part2} {parts.exercises2}</p>
    <p>{parts.part3} {parts.exercises3}</p>
    </div>
   );
}
 

const Content = (content) => {
  return (
    <div>
      <Part part1 = {content.part1} exercises1 = {content.exercises1}/>
      <Part part2 = {content.part2} exercises2 = {content.exercises2}/>
      <Part part3 = {content.part3} exercises3 = {content.exercises3}/>
    </div>
   );
}

const Total = (total) => {
  return (
    <p>Number of exercises {total.exercises1 + total.exercises2 + total.exercises3}</p>
   );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2} part3 = {part3} exercises3 = {exercises3} />
      <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} />
    </div>
  )
}

export default App;
