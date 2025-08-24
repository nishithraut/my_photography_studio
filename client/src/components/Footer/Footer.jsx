import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="custom-footer">
      <div className="contact">
        <a href="#">Contact us</a>
        <br />
        <a href="#">Support Portal</a>
        <br />
        <a href="#">Blog</a>
      </div>
      <div className="links">
        <a href="https://www.instagram.com/nishithraut/"><i class="fa-brands fa-instagram"></i> Instagram</a>
        <br />
        <a href="https://www.linkedin.com/in/nishithraut"><i class="fa-brands fa-linkedin"></i> Linkdin</a>
        <br />
        <a href="mailto:nishithraut@gmail.com"><i class="fa-solid fa-envelope"></i> Gmail</a>
      </div>
    </div>
  );
}

export default Footer;



// <div className="row ">
      //   <div className="col">
      //     <p>Support</p>
      //     <a href="#" style={{ textDecoration: "none", color: "gray" }}>
      //       Contact us
      //     </a>
      //     <br />
      //     <a href="#" style={{ textDecoration: "none", color: "gray" }}>
      //       Support portal
      //     </a>
      //     <br />
      //     <a href="#" style={{ textDecoration: "none", color: "gray" }}>
      //       Z-Connect blog
      //     </a>
      //     <br />
      //   </div>

      //   <div className="col">
      //     <p>Account</p>
      //     <a
      //       href="#"
      //       style={{ textDecoration: "none", color: "gray" }}
      //       className=""
      //     >
      //       Instagram
      //     </a>
      //     <br />
      //     <a href="#" style={{ textDecoration: "none", color: "gray" }}>
      //       Linkdin
      //     </a>
      //     <br />
      //     <a href="#" style={{ textDecoration: "none", color: "gray" }}>
      //       Email
      //     </a>
      //     <br />
      //   </div>
      // </div>