import './mainpage.scss'
import Header from "./header"
import Carousel from './carousel';
import Listgame from './listgame';
import Winner from './winner';
import Footer from './footer'

const MainPage = () => {
    return (
        <div className='mainpage-container'>
            <Header />
            <Carousel />
            <Listgame />
            <Winner />
            <Footer />
        </div>
    );
}

export default MainPage;
