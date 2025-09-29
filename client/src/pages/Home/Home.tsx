import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Ribbon from '@/components/Ribbon/Ribbon';

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Ribbon />

      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
              Smart Student Hub
            </h1>
            <p className="text-xl text-blue-700 mb-8">
              Login or Register to Access the System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Faculty", icon: "faculty.svg", link: "/login" },
              { title: "Admin", icon: "admin.svg", link: "/login" },
              { title: "Student", icon: "student.svg", link: "/login" },
            ].map((item, index) => (
              <Link to={item.link} key={item.title} className="block">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center h-full border border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={`../../../assets/icons/${item.icon}`}
                    alt={`${item.title} Icon`}
                    className="h-24 w-24 mb-6 object-contain"
                  />
                  <h2 className="text-2xl font-semibold text-blue-800">
                    {item.title}
                  </h2>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;