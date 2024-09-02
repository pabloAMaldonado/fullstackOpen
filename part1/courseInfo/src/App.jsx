
const Header = ({head}) => {
  return (
    <h1>{head.name}</h1>
  )
}

const Total = ({info}) => {
  return (
    <p>
      Number of excercises {info.parts[0].size + info.parts[1].size + info.parts[2].size}
    </p>
  )
}

const Part = ({part, excecise}) => {
  return (
    <p>
      {part} - {excecise}
    </p>
  )
}

const Content = ({info}) => {
  return (
    <div >
      <Part part={info.parts[0].name} excecise={info.parts[0].size}/>
      <Part part={info.parts[1].name} excecise={info.parts[1].size}/>
      <Part part={info.parts[2].name} excecise={info.parts[2].size}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        size: 10
      },
      {
        name: 'Using props to pass data',
        size: 7
      },
      {
        name: 'State of a component',
        size: 4
      }
    ]
  }

  return (
    <div>
      <Header head={course}/>
      <Content info={course} />
      <Total info={course} />
    </div>
  )
}

export default App
