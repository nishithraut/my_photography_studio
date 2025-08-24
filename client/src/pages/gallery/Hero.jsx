import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext"; // ✅ import auth hook

function Hero() {
  const [imgURL, setImgURL] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // for clicked img
  const [showUploadModal, setShowUploadModal] = useState(false); // ✅ for add image modal
  const [file, setFile] = useState(null); // ✅ store file
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth(); // ✅ access auth

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      style: { color: "red", fontWeight: "bold" },
    });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right", style: { color: "green" } });

  // ✅ Fetch all images (runs on mount and after add/delete)
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3002/gallery");
      setImgURL(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      console.log("to be deleted ", id);
      const { data } = await axios.delete(
        `http://localhost:3002/gallery/${id}`,
        {withCredentials:true}
      );
      const { success, message } = data;

      if (success) {
        console.log("Deleted ", id);
        setSelectedImage(null); // close modal
        fetchImages(); // refresh images
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("handling deletion image error :", err);
    }
  };

  // ✅ Upload handler
  const handleUpload = async () => {
    if (!file) {
      handleError("Please select an image first!");
      return;
    }

    try {
      setLoading(true); // ✅ start loading
      const formData = new FormData();
      console.log(formData);
      console.log("after append")
      formData.append("image", file);
      console.log(formData)

      const { data } = await axios.post(
        "http://localhost:3002/gallery",
        formData,
        {
          withCredentials:true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
      console.error("Upload error:", err);
      handleError("Failed to upload image!");
    } finally {
      setLoading(false); // ✅ stop loading no matter what
    }
  };

  

  


  const col1 = [];
  const col2 = [];
  const col3 = [];

  imgURL.forEach((img, index) => {
    if (index % 3 === 0) col1.push(img); // 1st, 4th, 7th...
    else if (index % 3 === 1) col2.push(img); // 2nd, 5th, 8th...
    else col3.push(img); // 3rd, 6th, 9th...
  });

  return (
    <>
      <div className="hero">
        <div className="col-1">
          {col1.map((img) => (
            <img
              key={img._id}
              src={img.imageURL}
              onClick={() => setSelectedImage(img)}
              style={{ cursor: "pointer" }}
              alt=""
            />
          ))}
        </div>
        <div className="col-2">
          {col2.map((img) => (
            <img
              key={img._id}
              src={img.imageURL}
              onClick={() => setSelectedImage(img)}
              style={{ cursor: "pointer" }}
              alt=""
            />
          ))}
        </div>
        <div className="col-3">
          {col3.map((img) => (
            <img
              key={img._id}
              src={img.imageURL}
              onClick={() => setSelectedImage(img)}
              style={{ cursor: "pointer" }}
              alt=""
            />
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="zoom-modal"
            onClick={() => setSelectedImage(null)} // close modal on background click
            >
            <div className="zoom-modal-inside"
              onClick={(e) => e.stopPropagation()} // prevent modal close on button click
              >
              <img
                src={selectedImage.imageURL}
                alt=""
                className="zoom-img"
                
              />

              {/* ✅ Delete Button (only if logged in) */}
              {auth.loggedIn && (
                <button className="del-btn"
                  onClick={() => handleDelete(selectedImage._id)} // replace with axios delete
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}

        {/* ➕ Upload Modal */}
        {showUploadModal && (
          <div className="showModal"
            onClick={() => setShowUploadModal(false)}
          >
            <div className="showModalInner"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 style={{ marginBottom: "15px" }}>Upload New Image</h4>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginBottom: "15px" }}
              />
              <br />
              <button className="upload-btn"
                style={{
                  background: loading ? "darkgray" : "gray",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onClick={handleUpload}
                disabled={loading} // ✅ disable button while uploading
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}

        {/* ✅ Add Button (bottom of gallery, only if logged in) */}
        {auth.loggedIn && (
          <div className="add-btn-div" >
            <button className="add-btn"
              onClick={() => setShowUploadModal(true)}
            >
              + Add Image
            </button>
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

export default Hero;




