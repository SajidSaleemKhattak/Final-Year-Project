import React from "react";
import logo from "../assets/home/logo.png";
import manBg from "../assets/manBg.png";
import bg2 from "../assets/bg2.png";
import manImg from "../assets/home/man.png";
import { RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Home = () => {
  const immigrationServices = [
    {
      title: "Visa Applications",
      description:
        "Professional guidance for tourist, work, student, and family visa processing.",
    },
    {
      title: "Permanent Residency",
      description:
        "Expert support for PR applications, appeals, and documentation.",
    },
    {
      title: "Citizenship & Naturalization",
      description:
        "Legal assistance for citizenship tests, interviews, and paperwork.",
    },
    {
      title: "Deportation Defense",
      description:
        "Strong representation to challenge deportation orders and protect your rights.",
    },
    {
      title: "Work Permits & Employment Visas",
      description:
        "Streamlined solutions for employer-sponsored visas and work authorizations.",
    },
    {
      title: "Refugee & Asylum Claims",
      description:
        "Compassionate legal aid for asylum seekers and refugee status applications.",
    },
  ];
  return (
    <div className="px-4 md:px-10 lg:px-24 pt-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <img
          src={logo}
          className="w-[150px] md:w-[219px] h-auto mb-4 md:mb-0"
          alt="logo"
        />
        <div className="flex gap-4">
          <Link to="/signup">
            <button className="px-6 py-1.5 border rounded-3xl text-sm">
              Sign up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-1.5 bg-[#62B9CB] text-white rounded-3xl text-sm">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 min-h-[80vh]">
        <div className="flex flex-col justify-center gap-6 text-center md:text-left">
          <p className="text-3xl md:text-4xl lg:text-6xl text-[#1B4B65] font-bold leading-snug">
            Elevate Your Legal Strategy Partner To Consult
          </p>
          <p className="text-base md:text-lg px-2 md:px-0">
            We are here to help you take care of your legality with the best
            service especially for you.
          </p>
          <button className="px-6 py-2 bg-[#62B9CB] text-white rounded-3xl w-fit self-center md:self-start text-sm">
            Start Legal Consultation
          </button>
        </div>
        <div className="relative w-full h-full flex justify-center md:justify-end">
          <img
            className="absolute bottom-0 right-0 w-[250px] md:w-[444px] h-auto z-10"
            src={manImg}
            alt=""
          />
          <img
            className="absolute bottom-0 right-0 w-full max-w-[500px] opacity-80"
            src={manBg}
            alt=""
          />
        </div>
      </div>

      {/* HERO SECTION 2 */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-100 p-6 mt-16">
          <div>
            <p className="text-3xl ">
              Trust Your Future &
              <p className="text-[#62B9CB] text-4xl font-bold">Peaceful Life</p>
            </p>
            <p className="text-sm mt-4">
              No more haggling over schedules or grappling with travel. With
              CounsalHub Audio & Video Consultation, you access a roster of
              experienced lawyers right at your convenience. Simply select a
              legal expert, choose from the available time slots, and voila,
              you’re booked. Save time, reduce stress, and get online legal
              information and advice
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cyan-100 p-4 border-2 border-blue-200 shadow text-center flex flex-col items-center gap-2 translate-y-5">
              <div className="bg-white p-3 rounded-full text-purple-500 ">
                <RiPagesLine size={30} />
              </div>
              <p className="font-semibold">Immigration</p>
              <p className="text-xs">
                Expert legal guidance for visas, residency, and citizenship
                matters.
              </p>
            </div>
            <div className="bg-cyan-100 p-4 border-2 border-blue-200 shadow text-center flex flex-col items-center gap-2 ">
              <div className="bg-white p-3 rounded-full text-purple-500">
                <RiPagesLine size={30} />
              </div>
              <p className="font-semibold">Matrimonial</p>
              <p className="text-xs">
                Trusted counsel for divorce, alimony, and family disputes.
              </p>
            </div>
            <div className="bg-cyan-100 p-4 border-2 border-blue-200 shadow text-center flex flex-col items-center gap-2 translate-y-5">
              <div className="bg-white p-3 rounded-full text-purple-500">
                <RiPagesLine size={30} />
              </div>
              <p className="font-semibold">Property</p>
              <p className="text-xs">
                Legal solutions for real estate, leases, and property disputes.
              </p>
            </div>
            <div className="bg-cyan-100 p-4 border-2 border-blue-200 shadow text-center flex flex-col items-center gap-2">
              <div className="bg-white p-3 rounded-full text-purple-500">
                <RiPagesLine size={30} />
              </div>
              <p className="font-semibold">Personal</p>
              <p className="text-xs">
                Dedicated support for wills, contracts, and individual legal
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION 3 */}
      <div className="bg-[#094B72] text-white grid grid-cols-1 md:grid-cols-4 gap-6 py-8 px-6 mt-10 text-center md:text-left">
        <div>
          <p className="font-semibold">
            Our <span className="text-[#33A1C1]">Achivements</span>
          </p>
          <p className="text-sm mt-1">See How far have we come</p>
        </div>
        <div>
          <p className="font-bold text-xl">70+</p>
          <p className="text-sm text-[#33A1C1]">Cities Covered</p>
        </div>
        <div>
          <p className="font-bold text-xl">20k+</p>
          <p className="text-sm text-[#33A1C1]">Cases Solved</p>
        </div>
        <div>
          <p className="font-bold text-xl">150+</p>
          <p className="text-sm text-[#33A1C1]">Active Lawyers</p>
        </div>
      </div>

      {/* HERO SECTION 4 */}
      <div className="mt-12 text-center px-4">
        <p className="text-2xl">Experience a smarter</p>
        <p className="text-2xl font-bold text-[#33A1C1] mb-6">
          Legal solution Platform in your hand
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {immigrationServices.map((service, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <RiPagesLine size={30} className="text-blue-600" />
              <p className="font-semibold mt-3">{service.title}</p>
              <p className="text-sm text-gray-600 mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <Link to="/login">
          <button className="px-8 py-2 bg-[#33A1C1] text-white rounded-3xl mt-10 mb-10">
            Talk to Lawyer
          </button>
        </Link>
      </div>

      {/* SUCCESS STORIES */}
      <div className="bg-[#1B4B65] text-white flex flex-col items-center py-16 px-4">
        <p className="text-xl mb-1">Success Stories</p>
        <p className="font-bold text-xl">To Know About Our Lawyers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white text-black p-6 rounded-sm w-full max-w-xs mx-auto flex flex-col gap-4 text-center items-center">
            <div className="text-4xl">,,</div>
            <p className="text-sm">
              “Division of Labor’s creative ideas were great...”
            </p>
            <div className="flex items-center gap-3">
              <RiPagesLine size={40} />
              <div className="text-left">
                <p className="font-semibold text-sm">Joew Harbert</p>
                <p className="text-gray-400 text-xs">CEO, NoonBrew</p>
              </div>
            </div>
          </div>
          <div className="bg-white text-black p-6 rounded-sm w-full max-w-xs mx-auto flex flex-col gap-4 text-center items-center">
            <div className="text-4xl">,,</div>
            <p className="text-sm">
              “Division of Labor’s creative ideas were great...”
            </p>
            <div className="flex items-center gap-3">
              <RiPagesLine size={40} />
              <div className="text-left">
                <p className="font-semibold text-sm">Joew Harbert</p>
                <p className="text-gray-400 text-xs">CEO, NoonBrew</p>
              </div>
            </div>
          </div>
          <div className="bg-white text-black p-6 rounded-sm w-full max-w-xs mx-auto flex flex-col gap-4 text-center items-center">
            <div className="text-4xl">,,</div>
            <p className="text-sm">
              “Division of Labor’s creative ideas were great...”
            </p>
            <div className="flex items-center gap-3">
              <RiPagesLine size={40} />
              <div className="text-left">
                <p className="font-semibold text-sm">Joew Harbert</p>
                <p className="text-gray-400 text-xs">CEO, NoonBrew</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="py-16 text-black">
        <h2 className=" text-center text-2xl mb-8">Why Choose Us</h2>
        <div className="flex justify-center items-center">
          <div
            className="bg-cover bg-center p-8 w-full max-w-6xl"
            style={{ backgroundImage: `url(${bg2})` }}
          >
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-black ">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-semibold">Economic</p>
                    <p>
                      Our Lawyer Consultation System offers an affordable way to
                      access legal services without the typical high costs.
                      Clients can consult experienced lawyers at reasonable
                      rates, cutting out unnecessary fees and expenses often
                      associated with in-person meetings. This ensures that
                      legal advice is accessible to everyone, regardless of
                      their budget.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Professional</p>
                    <p>
                      We only work with verified and qualified lawyers who
                      specialize in various areas of law. Each lawyer on our
                      platform brings years of professional experience, ensuring
                      that clients receive accurate, expert legal advice. Our
                      platform ensures that every consultation maintains the
                      highest standards of professionalism.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Security</p>
                    <p>
                      The security of our users’ data is paramount. Our system
                      uses state-of-the-art encryption and security protocols to
                      protect personal information, conversations, and legal
                      documents. We adhere to strict privacy laws to ensure that
                      all user data remains confidential and secure at all
                      times.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="border-0 rounded-[800px] bg-black p-6">
                    <img
                      src={manImg}
                      className="w-32 md:w-40 rounded-full"
                      alt="lawyer"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>
                      In the legal field, timely advice is crucial. Our platform
                      enables clients to easily schedule appointments with
                      lawyers, send and receive messages in real-time, and track
                      the progress of their cases. This eliminates delays and
                      ensures that legal issues are addressed promptly and
                      efficiently.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">24*7</p>
                    <p>
                      Legal matters don’t adhere to business hours, which is why
                      our system operates 24/7. Clients can book consultations,
                      send messages, and receive updates at any time, ensuring
                      they have access to the legal support they need, when they
                      need it.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">User Satisfaction</p>
                    <p className="">
                      We are dedicated to providing a seamless user experience.
                      Our platform is designed to be intuitive and
                      user-friendly, making it easy for clients to connect with
                      lawyers, track their cases, and get quick responses. With
                      a focus on customer support and satisfaction, we ensure
                      that every client’s legal needs are met with the utmost
                      care and attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm pt-18 -mb-6">
              © 1998-2019 Copyright | All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
