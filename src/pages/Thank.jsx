import NavBar from '../components/NavBar'

function Thank({name, onReturn}) {
  return (
    <section className='min-h-screen md:px-8 flex flex-col px-4 py-6 container mx-auto'>
        <NavBar/>
        <div className='py-8 flex flex-1 flex-col items-center justify-center'>
            <h1 className='text-7xl py-6 uppercase font-semibold text-green text-center'>thank you '{name}' for your order</h1>
            <p className='sm:text-2xl text-xl text-green-800 font-medium text-center'>you will reserve a call to confirm your order </p>
            <button onClick={onReturn} className="bg-green text-white py-4 px-8 rounded-lg my-6 text-xl font-medium uppercase">return</button>
        </div>
    </section>
  )
}

export default Thank