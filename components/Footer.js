import React from "react";

const Footer = () => {
  return (
    <footer className="relative">
      <section className="max-w-[1240px] mt-20 mb-10 mx-auto  gap-2 font-body top-7 md:p-10">
        <div>
          <h3>{new Date().getFullYear()} All Right Reserved</h3>
          Designed and Developed By{" "}
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
            {" "}
            Ayush{" "}
          </span>
          &
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
            {" "}
            Ashu{" "}
          </span>
          <div>Deployed on the Polygon Cardona Testnet 💜</div>{" "}
        </div>
      </section>

      <div className="bg-[#1242ef] absolute left-[-380px] top-[222.18px] h-[352px] w-[652px] blur-[350px] rounded-full"></div>
    </footer>
  );
};

export default Footer;
