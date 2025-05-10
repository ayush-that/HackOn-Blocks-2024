import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto py-8">
      <section className="max-w-[1240px] mx-auto gap-2 font-body px-4">
        <div className="text-center">
          <h3>{new Date().getFullYear()} All Right Reserved</h3>
          Designed and Developed By{" "}
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
            {" "}
            Ayush{" "}
          </span>
          <div>Deployed on the Polygon Cardona zkEVM 💜</div>{" "}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
