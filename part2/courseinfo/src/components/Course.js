import React, {useEffect, useState} from 'react'

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

export default Course