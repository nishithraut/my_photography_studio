import LeftOuter from './LeftOuter';
import Hero from './Hero';
import RightOuter from './RightOuter';
import { Helmet } from '@dr.pogodin/react-helmet'; // ✅ import Helmet
import './About.css';

function DescPage() {
  return (
    <div className="about-page">
      <Helmet>
        <title>About | Nishith Raut</title>
        <meta 
          name="description" 
          content="Learn more about this project, its mission, and the story behind it." 
        />
        <meta name="keywords" content="About, React App, Project, Description" />
      </Helmet>

      <LeftOuter />
      <Hero />
      <RightOuter />
    </div>
  );
}

export default DescPage;
