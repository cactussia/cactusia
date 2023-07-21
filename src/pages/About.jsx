import Desc from '../components/Desc'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

function About() {
  return (
    <>
      <NavBar/>
      <main className='w-screen py-6 flex justify-center items-center'>
        {/* <section className='container flex justify-center items-center flex-col gap-8'>
          <h1 className='sm:text-4xl text-green text-4xl uppercase font-bold'>About Us</h1>
          <p className='text-center sm:text-2xl px-6'>
            Bienvenue sur Cactusia, votre destination en ligne pour les pots de cactus et les cactus eux-mêmes ! Avec une expérience de plus de 3 ans dans le domaine, nous sommes fiers de vous offrir un large choix de pots et de cactus de haute qualité.
            Chez Cactusia, nous comprenons que les cactus sont bien plus que de simples plantes. Ils apportent une touche de nature exotique à votre intérieur ou à votre jardin, tout en étant faciles à entretenir. Notre passion pour ces plantes uniques se reflète dans notre collection soigneusement sélectionnée.
            Que vous soyez un débutant enthousiaste ou un passionné chevronné, nous avons ce qu'il vous faut. Notre gamme de pots de cactus est conçue pour répondre à tous les goûts et à tous les styles d'aménagement. Des designs modernes et élégants aux motifs ludiques et colorés, vous trouverez sûrement le pot parfait pour mettre en valeur votre cactus préféré.
            Chez Cactusia, nous nous engageons à fournir à nos clients une expérience d'achat exceptionnelle. Notre équipe amicale est là pour vous conseiller et répondre à toutes vos questions. Nous nous efforçons de garantir votre satisfaction à chaque étape de votre parcours avec nous, de la sélection du pot idéal à la livraison sécurisée de votre nouveau compagnon vert.
            Explorez notre site dès maintenant et laissez-vous séduire par la beauté et la simplicité des cactus. Que vous cherchiez à ajouter une touche de verdure à votre bureau, à créer un coin détente sur votre balcon ou à égayer votre intérieur, Cactusia est là pour vous accompagner.
          </p>
        </section> */}
        <Desc title={"About Us"} 
        text={`Bienvenue sur Cactusia, votre destination en ligne pour les pots de cactus et les cactus eux-mêmes ! Avec une expérience de plus de 3 ans dans le domaine, nous sommes fiers de vous offrir un large choix de pots et de cactus de haute qualité.
          Chez Cactusia, nous comprenons que les cactus sont bien plus que de simples plantes. Ils apportent une touche de nature exotique à votre intérieur ou à votre jardin, tout en étant faciles à entretenir. Notre passion pour ces plantes uniques se reflète dans notre collection soigneusement sélectionnée.
          Que vous soyez un débutant enthousiaste ou un passionné chevronné, nous avons ce qu'il vous faut. Notre gamme de pots de cactus est conçue pour répondre à tous les goûts et à tous les styles d'aménagement. Des designs modernes et élégants aux motifs ludiques et colorés, vous trouverez sûrement le pot parfait pour mettre en valeur votre cactus préféré.
          Chez Cactusia, nous nous engageons à fournir à nos clients une expérience d'achat exceptionnelle. Notre équipe amicale est là pour vous conseiller et répondre à toutes vos questions. Nous nous efforçons de garantir votre satisfaction à chaque étape de votre parcours avec nous, de la sélection du pot idéal à la livraison sécurisée de votre nouveau compagnon vert.
          Explorez notre site dès maintenant et laissez-vous séduire par la beauté et la simplicité des cactus. Que vous cherchiez à ajouter une touche de verdure à votre bureau, à créer un coin détente sur votre balcon ou à égayer votre intérieur, Cactusia est là pour vous accompagner.`}
        />
      </main>
      <Footer/>
    </>
  )
}

export default About