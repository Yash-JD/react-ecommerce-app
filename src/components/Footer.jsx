import React from "react";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mb-0 sticky">
      <div className="flex justify-center items-center space-x-6">
        <a
          href="mailto:yash_21053@ldrp.ac.on"
          aria-label="Email"
          className="hover:text-gray-400"
        >
          <MdEmail size={24} />
        </a>
        <a
          href="https://github.com/Yash-JD"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-400"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com/in/yash-dobariya"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-gray-400"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="text-center mt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
