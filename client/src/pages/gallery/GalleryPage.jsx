import RightGallery from "./RightGallery";
import LeftGallery from "./LeftGallery";
import Hero from "./Hero";
import { Helmet } from "@dr.pogodin/react-helmet"; // ✅ import Helmet
import './gallery.css';

function GalleryPage() {
  return ( 
    <div className="gallery-page">
      <Helmet>
        <title>Gallery | Nishith Raut</title>
        <meta 
          name="description" 
          content="Browse through our curated gallery showcasing images, stories, and creative visuals." 
        />
        <meta name="keywords" content="Gallery, Photos, React App, Images" />
      </Helmet>

      <LeftGallery/>
      <Hero/>
      <RightGallery/>
    </div>
  );
}

export default GalleryPage;
