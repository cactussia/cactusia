import Footer from '../components/Footer'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <>
    <div className='flex flex-col h-[100vh]'>
      <NavBar/>
      <Main/>
    </div>
      <Footer/>
    </>
  )
}

export default Home