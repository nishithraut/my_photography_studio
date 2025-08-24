import React, {  useEffect,useState,useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function RightAbout() {
  const { auth } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imgURL, setImgURL] = useState();
  const [inView, setInView] = useState(false);

  const imgRef = useRef(null);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      style: { color: "red", fontWeight: "bold" },
    });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right", style: { color: "green" } });


  const handleUpdate= async () => {
    if (!file) {
      handleError("Please select an image first!");
      return;
    }

    setLoading(true); // ✅ start loading
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "homePageAboutImg");

    try {
      const { data } = await axios.put(
        "http://localhost:3002/misc", 
        formData, 
        {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

      const { success, message } = data;
      if (success) {
        setShowUploadModal(false);
        setFile(null);
        fetchImages(); // refresh or fetch new image
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false); // ✅ stop loading no matter what
    }
  };

  // ✅ Fetch all images (runs on mount and after add/delete)
  const fetchImages = async () => {
    try {
        const { data } = await axios.get("http://localhost:3002/misc", {
          params: { title: "homePageAboutImg" }, // ✅ send query parameter
        });
        console.log(data);
        setImgURL(data.imageUrl);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 🔥 Animate only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target); // play only once
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <>
      <div className="right-about">
        {/* wrapper to position button on image */}
        <div className="right-about-wrapper">
          <img ref={imgRef} src={imgURL} alt="About Nishith" className={`animated-img ${inView ? "pop-in" : ""}`}/>

          {auth.loggedIn && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="edit-btn"
            >
              Edit
            </button>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div
            className="upload-modal"
            onClick={() => setShowUploadModal(false)}
          >
            <div
              className="upload-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h4>Upload New Image</h4>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="upload-input"
              />
              <br />
              <button
                className="upload-btn"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default RightAbout;
