import Desc from '../components/Desc'
import Footer from '../components/Footer'
import Main from '../components/Main'
import NavBar from '../components/NavBar'
import WhatsappBtn from '../components/WhatsappBtn'
import Reviews from './Reviews'

function Home() {
  return (
    <>
    <section className='flex flex-col h-[100vh]'>
      <NavBar/>
      <Main/>
    </section>
    <section className='w-screen py-24 flex justify-center items-center'>
      <Desc
      title={"À propos de notre produit"}
      text={`
      Découvrez notre magnifique pot de cactus en poterie, spécialement conçu pour embellir à la fois vos espaces intérieurs et extérieurs. Chez Cactusia, nous mettons tout en œuvre pour offrir des produits à la fois esthétiques et respectueux de l'environnement.
      Nos pots de cactus sont fabriqués à partir de poterie de haute qualité, ce qui leur confère une durabilité exceptionnelle tout en ajoutant une touche artisanale et rustique à votre environnement. Chaque pot est minutieusement façonné à la main par nos talentueux artisans, ce qui signifie que chaque pièce est unique en son genre.
      L'un des avantages majeurs de nos pots de cactus réside dans la possibilité de personnalisation offerte à nos clients. Vous pouvez choisir la couleur de pot qui correspond parfaitement à votre style et à votre décor. Que vous préfériez des tons neutres et apaisants ou des couleurs vibrantes et audacieuses, notre large gamme de choix vous permettra de trouver le pot idéal.
      En ce qui concerne le cactus lui-même, nous vous proposons une sélection de cactus 100% naturels. Vous pouvez choisir parmi différentes variétés, formes et tailles, selon vos préférences et l'espace disponible. Les cactus sont des plantes robustes, adaptées à diverses conditions, ce qui les rend parfaits pour les espaces intérieurs et extérieurs. Que vous souhaitiez apporter une touche de verdure à votre salon, votre terrasse ou votre jardin, nos pots de cactus en poterie sont un choix idéal.
      Optez pour notre pot de cactus en poterie pour ajouter une note naturelle et élégante à vos espaces intérieurs et extérieurs. Laissez la beauté de la poterie artisanale et la splendeur naturelle du cactus égayer votre environnement, en créant des compositions uniques et en apportant une atmosphère apaisante et vivifiante à votre quotidien
      `}
      />
    </section>
    <Reviews/>
    <WhatsappBtn/>
    <Footer/>
    </>
  )
}

export default Home