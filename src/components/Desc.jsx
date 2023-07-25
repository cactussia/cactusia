import CactusIcon from "./svg/CactusIcon";

export default function Desc({title, text}) {
  return (
    <section className='container flex justify-center items-center flex-col gap-8 overflow-hidden'>
        <div className="flex justify-center items-center flex-col gap-4">
          <CactusIcon width={140} height={140} />
          <h1 className='sm:text-4xl text-center text-green text-4xl uppercase font-bold'>{title}</h1>
        </div>
        <p className='text-center sm:text-xl sm:px-12 px-8'>
        {text}
        </p>
  </section>
  )
}
