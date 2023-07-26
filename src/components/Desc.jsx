import CactusIcon from "./svg/CactusIcon";

export default function Desc({title, text}) {
  return (
    <section className='container flex justify-center items-center flex-col gap-8 overflow-hidden'>
        <div className="flex justify-center items-center flex-col gap-4">
          <CactusIcon width={140} height={140} />
          <h1 className='sm:text-4xl text-center text-green text-4xl uppercase font-bold'>{title}</h1>
        </div>
        <article className="flex justify-center items-center gap-3 flex-col">
          {/* split the text into paragraphs */}
          {text.split(".").map((p,i)=> <p key={i} className='md:w-[70%] first-letter:text-green first-letter:text-xl first-letter:font-bold first-letter:px-[1px] text-justify sm:text-xl sm:px-12 px-8'>{p}.</p>)}
        </article>
  </section>
  )
}
