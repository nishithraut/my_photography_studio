import HomeVideo from './HomeVideo';
import HomeAbout from './HomeAbout'; 
import { Helmet } from '@dr.pogodin/react-helmet';  // ✅ import Helmet
import './home.css';   

function HomePage() {
  return (
    <div className='home-page'>
      <Helmet>
        <title>Home | Nishith Raut</title>
        <meta name="description" content="Welcome to the homepage of my React app. Explore videos, stories, and more." />
        <meta name="keywords" content="React, Home, SEO, Helmet, My App" />
      </Helmet>

      <HomeVideo />
      <HomeAbout />
    </div>
  );
}

export default HomePage;
