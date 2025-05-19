import React, { useState, useEffect } from "react";
import { FaUserAlt, FaStar } from "react-icons/fa";
import pfp from "../../assets/Client/pfp.png";
import LSideBar from "../lawyer/components/L-sidebar.jsx";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const LawyerProfile = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lawyer, setLawyer] = useState(
    JSON.parse(localStorage.getItem("lawyer")) || {}
  );
  const [editedLawyer, setEditedLawyer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [areasOfPractice, setAreasOfPractice] = useState([]);
  const [newAreaOfPractice, setNewAreaOfPractice] = useState("");

  useEffect(() => {
    // Initialize editedLawyer with current lawyer data
    setEditedLawyer(lawyer);
    // Initialize practice areas from lawyer data
    setAreasOfPractice(lawyer.areasOfPractice || []);
    // TODO: Fetch reviews from your backend API
    // Example: fetchLawyerReviews(lawyer.id).then(setReviews);
    console.log("lawyer", lawyer);
    console.log("areasOfPractice", lawyer.areasOfPractice);
  }, [lawyer]);

  const handleNotification = () => {
    setShowNotification((toggle) => !toggle);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Add API call to update lawyer data
    setLawyer(editedLawyer);
    localStorage.setItem("lawyer", JSON.stringify(editedLawyer));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLawyer(lawyer);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLawyer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAreaOfPractice = () => {
    if (
      newAreaOfPractice.trim() &&
      !areasOfPractice.includes(newAreaOfPractice.trim())
    ) {
      setAreasOfPractice([...areasOfPractice, newAreaOfPractice.trim()]);
      setEditedLawyer((prev) => ({
        ...prev,
        areasOfPractice: [...areasOfPractice, newAreaOfPractice.trim()],
      }));
      setNewAreaOfPractice("");
    }
  };

  const handleRemoveAreaOfPractice = (areaToRemove) => {
    const updatedAreas = areasOfPractice.filter(
      (area) => area !== areaToRemove
    );
    setAreasOfPractice(updatedAreas);
    setEditedLawyer((prev) => ({
      ...prev,
      areasOfPractice: updatedAreas,
    }));
  };

  let active = "profile";

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <img
              src={Vector}
              onClick={handleNotification}
              className="w-5 h-5 hover:scale-120 duration-150 cursor-pointer active:scale-110"
              alt=""
            />
            {showNotification && (
              <div className="absolute top-12 flex border-[#62B9CB] -left-3 justify-between gap-6 font-semibold z-50 border-2 rounded-xl py-4 pb-7 w-70 flex-col items-center   bg-white text-[#62B9CB]">
                <div className="flex justify-between px-6 bg-[#62B9CB]  w-full py-4 -mt-[17px] border-0 rounded-t-xl">
                  <div className="text-xl text-white">Notifcations</div>
                  <div className="text-white">
                    <IoMdNotificationsOutline size={30} />
                  </div>
                </div>

                <div className="flex gap-4 justify-between items-center w-full px-6 ">
                  <div>
                    <Link to="/lawyerappointments/request">
                      <div className="text-lg underline underline-offset-6 hover:text-[black]">
                        Appointment Requests
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white ">
                    2
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center w-full px-6 ">
                  <div>
                    <Link to="/lawyermessages">
                      <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                        New Messages
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                    7
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center w-full px-6">
                  <div>
                    <Link to="/lawyerappointments/active">
                      <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                        Appointment Pendings
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                    3
                  </div>
                </div>
              </div>
            )}

            <img src={gear} className="w-5 h-5" alt="" />
            <div className="flex justify-between gap-1.5">
              <img
                src={lawyer.profilePicture || pfp}
                className="w-7 h-7 rounded-4xl"
                alt=""
              />
              <p className="text-neutral-600 font-semibold">{lawyer.name}</p>
            </div>
          </div>
        </div>

        <hr className="border-1 border-gray-200 mt-3" />

        {/* MAIN */}
        <div className="flex">
          {/* SIDEBAR */}
          <LSideBar active={active} />{" "}
          {/* Use the imported LSidebar component */}
          {/* ACTION */}
          <div className="w-[80%] px-4 py-3">
            <p className="text-2xl font-semibold">Profile</p>
            <div className="flex mt-6 gap-2">
              <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-3/10 px-3 py-4">
                <div className="flex flex-col gap-1 items-center justify-center">
                  <FaUserAlt className="text-5xl text-[#62B9CB]" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedLawyer.name || ""}
                      onChange={handleInputChange}
                      className="font-semibold text-xl text-center border rounded p-1"
                    />
                  ) : (
                    <p className="font-semibold text-xl">{lawyer.name}</p>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialization"
                      value={editedLawyer.specialization || ""}
                      onChange={handleInputChange}
                      className="text-[#62B9CB] text-[13px] text-center border rounded p-1"
                    />
                  ) : (
                    <p className="text-[#62B9CB] text-[13px]">
                      {lawyer.specialization || "Civil Pro, Criminal"}
                    </p>
                  )}
                  <div className="flex gap-1 text-[#62B9CB] text-[13px] mt-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-2 px-6 border-0 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white py-2 px-6 border-0 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center bg-[#62B9CB] text-white py-2 px-14 border-0 rounded-lg mt-4"
                    >
                      Edit Profile
                    </button>
                  )}

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Location</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedLawyer.location || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      />
                    ) : (
                      <div>{lawyer.location || "Islamabad, Pakistan"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Language</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="languages"
                        value={editedLawyer.languages || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      />
                    ) : (
                      <div>{lawyer.languages || "Urdu, English"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Member Since</div>
                    <div>{lawyer.memberSince || "January 2024"}</div>
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Experience</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={editedLawyer.experience || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      />
                    ) : (
                      <div>{lawyer.experience || "20+ Years"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Rates/Fee</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="rates"
                        value={editedLawyer.rates || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      />
                    ) : (
                      <div>{lawyer.rates || "RS. 1000/Hour"}</div>
                    )}
                  </div>

                  <div>
                    <button className="flex items-center bg-[#62B9CB] text-white py-2 px-20 border-0 rounded-lg mt-8">
                      Area of Practice
                    </button>
                    {isEditing ? (
                      <div className="mt-4">
                        <div className="flex gap-2 mb-4">
                          <input
                            type="text"
                            value={newAreaOfPractice}
                            onChange={(e) =>
                              setNewAreaOfPractice(e.target.value)
                            }
                            placeholder="Add new practice area"
                            className="border rounded p-2 flex-grow"
                          />
                          <button
                            onClick={handleAddAreaOfPractice}
                            className="bg-[#62B9CB] text-white px-4 py-2 rounded-lg"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {areasOfPractice.map((area, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-[#62B9CB] text-white px-3 py-1 rounded-full"
                            >
                              <span>{area}</span>
                              <button
                                onClick={() => handleRemoveAreaOfPractice(area)}
                                className="text-white hover:text-red-200"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {areasOfPractice.length > 0 ? (
                          areasOfPractice.map((area, index) => (
                            <div
                              key={index}
                              className="bg-[#62B9CB] text-white px-3 py-1 rounded-full"
                            >
                              {area}
                            </div>
                          ))
                        ) : (
                          <p className="text-neutral-600">
                            No practice areas specified
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-fit border-1 border-neutral-200 rounded-2xl px-4 py-4">
                <div>
                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                    <p className="font-semibold text-xl mt-4">About</p>
                    {isEditing ? (
                      <div className="mt-2">
                        <textarea
                          name="bio"
                          value={editedLawyer.bio || ""}
                          onChange={handleInputChange}
                          className="text-neutral-600 w-full border rounded p-2"
                          rows="6"
                          placeholder="Write about your experience, expertise, and what makes you unique as a lawyer..."
                        />
                        <div className="mt-2 text-sm text-neutral-500">
                          Share your professional background, achievements, and
                          what clients can expect when working with you.
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        {lawyer.bio ? (
                          <p className="text-neutral-600 whitespace-pre-line">
                            {lawyer.bio}
                          </p>
                        ) : (
                          <p className="text-neutral-600 italic">
                            No bio provided. Click edit to add your professional
                            background and expertise.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4 relative">
                    <p className="font-semibold text-xl mt-4 mb-6">Reviews</p>

                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div key={index} className="mb-6">
                          <div className="flex items-center gap-3">
                            <FaUserAlt className="text-2xl text-[#62B9CB]" />
                            <p className="font-semibold text-md">
                              {review.reviewerName}
                            </p>
                          </div>

                          <div className="flex justify-start gap-2 items-center mt-2 mb-1">
                            <div className="flex gap-1 text-yellow-500 text-sm">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                            <p className="text-sm text-neutral-400">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>

                          <p className="text-neutral-600 text-sm">
                            {review.comment}
                          </p>

                          {index < reviews.length - 1 && (
                            <hr className="mt-4 border-neutral-300" />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-600">No reviews yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerProfile;
