import React from 'react'
import Layout from './Layout';

const PageNotFound = () => {

  const logo="https://cdn.vectorstock.com/i/1000x1000/70/17/404-liquid-error-vector-16717017.webp";
  return (
    <Layout>
    <div className='container text-center mt-3'>
      <img src={logo} alt='logo' />
          </div>
          </Layout>
  )
}

export default PageNotFound
