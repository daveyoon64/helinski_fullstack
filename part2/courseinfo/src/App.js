import React from 'react';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

const Course = (course) => {
  console.log('course', course)
  console.log('course name', course.course.parts)
  return (
    <div id="App">
      <div id="Course">
        <h1>{course.course.name}</h1>
        <div id="Content">
          {course.course.parts.map((course) => 
            <p key={course.id}>{course.name} {course.exercises}</p>
          )}
        </div>
      </div>
  </div>
  )
}

export default App