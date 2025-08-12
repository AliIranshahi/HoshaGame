import Footer from "@/components/footer/Footer";
import Intro from "@/components/intro/Intro";
import "@fontsource/press-start-2p";


export default async function Home() {

  // React Toast

  //

  return (
    <>

      <main className="element relative">
        <section>
          <Intro />
        </section>

      </main>
      <footer className="w-[100%]"><Footer /></footer>
      <div className="bubble-container">
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
      </div>



    </>
  );
}
