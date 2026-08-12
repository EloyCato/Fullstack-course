const Header = (props) => {
  //console.log('heading')
  return (
    <>
    <h2>{props.name}</h2>
    </>
  )
}

const Part = (props) =>{
  
  return(
  <p>
  {props.part.name} {props.part.exercises}
  </p>
  )
}

const Content = (props) => {
  //console.log('props should be below this')
  //console.log(props.part)
  return (
    <div>
        {props.part.map((part) => <Part key = {part.id} part = {part}/>)}
    </div>
  )
} 

const Total = (props) => {
  let sum = props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);

  //props.parts.forEach((part) => (sum += part.exercises))
  return (
    <p>Total of {sum} exercises </p>
  )
}

const Course = (props) => {
    const {name, parts} = props.course
    //const name = props.course.name
    //const parts = props.course.parts
    //console.log('course:', name)
    //console.log('parts:', parts)
    return (
        <div>
            <Header name={name} />
            <Content part={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course