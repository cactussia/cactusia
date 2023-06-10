import Footer from '../components/Footer'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <>
    <section className='flex flex-col h-[100vh]'>
      <NavBar/>
      <Main/>
    </section>
    <Footer/>
    </>
  )
}

export default Home