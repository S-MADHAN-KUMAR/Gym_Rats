import React from 'react'
import Hero from '../../components/user/Hero'

const HomePage = () => {
  return (
    <div class='container'>
<Hero/>
<a href="/login" className='ms-6'>login</a>

<a href="/register">register</a>
    </div>
  )
}

export default HomePage