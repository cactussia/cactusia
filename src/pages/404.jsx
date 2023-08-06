import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import Icon from '../assets/icons/signposts.gif';

export default function NotFound() {
    const navigate = useNavigate();

    // set a time out of 30s to redirect to the home page
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/");
        }, 30000);
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
    <section className='min-h-screen md:px-8 flex flex-col px-4 container mx-auto'>
        <NavBar/>
        <div className='py-8 flex flex-1 flex-col items-center justify-center gap-6'>
            <div className="flex justify-center items-center flex-col gap-4">
              <img src={Icon} className='relative h-[140px] w-[140px] object-cover object-center aspect-square mix-blend-darken hue-rotate-[-90deg] saturate-[.5] grayscale-[10%] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-green-700 before:z-20' alt=""/>
              <h1 className='sm:text-6xl text-4xl uppercase font-semibold text-green text-center'>404</h1>
              <h2 className='sm:text-4xl text-2xl uppercase font-semibold text-green text-center'>Page Not Found</h2>
            </div>
            <p className='sm:text-2xl text-xl  font-medium text-center'>
                The page you are looking for does not exist. You can go back to the home page by clicking the button below
            </p>
            <button onClick={() => navigate("/")} className="bg-green text-white py-4 px-8 rounded-lg my-6 text-xl font-medium uppercase">Return</button>
        </div>
    </section>
    )
}