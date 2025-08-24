import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet'; // ✅ import Helmet
import './NotFound.css';

function NotFound() {
  return (
    <div className='notfound'>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta 
          name="description" 
          content="The page you are looking for does not exist. Please check the URL or return to the homepage." 
        />
        <meta name="robots" content="noindex, nofollow" /> 
        {/* ✅ prevents search engines from indexing the 404 page */}
      </Helmet>

      <p className='not-found-text'>404 - Page Not Found</p>
    </div>
  );
}

export default NotFound;
