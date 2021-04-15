import React, {useEffect, useState} from 'react';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const currentTotal = course.parts.reduce((acc, cur) => acc + cur.exercises, 0);
    setTotal(currentTotal);
  }, [course.parts])

  return (
    <div id="App">
      <div id="Course">
        <h1>{course.name}</h1>
        <div id="Content">
          {course.parts.map((course) => 
            <p key={course.id}>{course.name} {course.exercises}</p>
          )}
        </div>
      </div>
      <Statistics total={total}/>  
    </div>
  )
}

const Statistics = ({total}) => {
  return (
    <div id="Statistics">
      <b><p>total of {total} exercises</p></b>
    </div>
  )
}
export default App