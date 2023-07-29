import NavBar from '../components/NavBar'
import PlantIcon from '../components/svg/PlantIcon'

function Thank({name, onReturn}) {
  return (
    <section className='min-h-screen md:px-8 flex flex-col px-4 py-6 container mx-auto'>
        <NavBar/>
        <div className='py-8 flex flex-1 flex-col items-center justify-center'>
            <div className="flex justify-center items-center flex-col gap-2 py-6">
              <PlantIcon width={140} height={140} />
              <h1 className='sm:text-6xl text-4xl uppercase font-semibold text-green text-center'>Merci "<span className='text-orange-800'>{name}</span>"  pour votre commande</h1>
            </div>
            <p className='sm:text-2xl text-xl  font-medium text-center'>Votre commande a bien été confirmée. Notre service prendra contact avec vous sous peu</p>
            <button onClick={onReturn} className="bg-green text-white py-4 px-8 rounded-lg my-6 text-xl font-medium uppercase">return</button>
        </div>
    </section>
  )
}

export default Thank