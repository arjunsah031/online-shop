
import About from './components/about/about'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Hero from './components/hero/hero'
import NewsLetter from './components/newslatter/newslatter'
import Products from './components/products/products'
import SpecialProducts from './components/specialproduct/specialproduct'

export default function Page () {
    return <>

        <Header/>
        <Hero/>
        <SpecialProducts/>
        <About/>

        <Products/>

        <NewsLetter/>
        <Footer/>


    </>
}