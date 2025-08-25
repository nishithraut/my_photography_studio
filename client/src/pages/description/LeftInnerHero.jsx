import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function LeftInnerHero() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState();
  const { auth } = useAuth();
  const [inView, setInView] = useState(false);

  const imgRef = useRef(null);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      style: { color: "red", fontWeight: "bold" },
    });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right", style: { color: "green" } });

  const handleUpdate = async () => {
    if (!file) {
      handleError("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "aboutPageAboutImg");

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/misc`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { success, message } = data;
      if (success) {
        setShowUploadModal(false);
        setFile(null);
        fetchImages();
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/misc`, {
        params: { title: "aboutPageAboutImg" },
      });
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
      <div className="inner-left">
        <div className="inner-left-container">
          <img
            ref={imgRef}
            src={imgURL}
            alt=""
            className={`left-image animated-img ${inView ? "pop-in" : ""}`}
          />

          {auth.loggedIn && (
            <button
              className="edit-button"
              onClick={() => setShowUploadModal(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ➕ Upload Modal */}
      {showUploadModal && (
        <div className="showModal" onClick={() => setShowUploadModal(false)}>
          <div className="showModalInner" onClick={(e) => e.stopPropagation()}>
            <h4 style={{ marginBottom: "15px" }}>Upload New Image</h4>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: "15px" }}
            />
            <br />
            <button
              className="upload-btn"
              style={{
                background: loading ? "darkgray" : "gray",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onClick={handleUpdate}
              disabled={loading} // ✅ disable button while uploading
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

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

export default LeftInnerHero;
