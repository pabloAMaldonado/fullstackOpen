import React, { useState } from 'react'

const Course = ({course}) => {
    const sum = course.parts
    .map(part => part.exercises)
    .reduce((total, exercises) => total + exercises, 0)
  
    return (
      <>
        <h1>{course.name}</h1>
        {course.parts.map(part => (
          <p key={part.id}>{part.name} {part.exercises}</p>
        ))}
        <p>Total {sum}</p>
      </>
    )
  }

export default Course 
