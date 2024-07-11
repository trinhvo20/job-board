export default function Hero() {
    return (
        <section className="container my-16">
            <h1 className="text-4xl font-bold text-center">
                Find your next<br/> dream job
            </h1>
            {/* <p className="text-center text-gray-600 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nihil, aperiam minima debitis commodi voluptas dolor odit tempore dolorem incidunt inventore totam labore tenetur accusantium adipisci iste cum sunt sint!
            </p> */}
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input 
                    type="search" 
                    className="border w-full p-2 rounded-md border-gray-400" 
                    placeholder="Search phrase..." />
                <button className="bg-blue-600 text-white p-2 rounded-md">
                    Search
                </button>
            </form>
        </section>
    )
}