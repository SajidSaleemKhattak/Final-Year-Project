import React, { useState, useEffect } from "react";
import { FaUserAlt, FaStar, FaSpinner } from "react-icons/fa";
import pfp from "../../assets/Client/pfp.png";
import LSideBar from "../lawyer/components/L-sidebar.jsx";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LawyerProfile = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [lawyer, setLawyer] = useState(null);
  const [editedLawyer, setEditedLawyer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [areasOfPractice, setAreasOfPractice] = useState([]);
  const [newAreaOfPractice, setNewAreaOfPractice] = useState("");
  const [notifications, setNotifications] = useState({
    appointments: 0,
    messages: 0,
    pending: 0,
  });

  // Configure axios defaults
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetchLawyerData();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const storedLawyer = JSON.parse(localStorage.getItem("lawyer"));
      if (!storedLawyer?._id) return;

      const [appointmentsRes, messagesRes] = await Promise.all([
        api.get(`/api/bookings?lawyerId=${storedLawyer._id}&status=pending`),
        api.get(`/api/chats/lawyer/${storedLawyer._id}`),
      ]);

      setNotifications({
        appointments: appointmentsRes.data.length,
        messages: messagesRes.data.filter((chat) => chat.unreadCount > 0)
          .length,
        pending: appointmentsRes.data.filter(
          (booking) => booking.status === "pending"
        ).length,
      });
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const fetchLawyerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const storedLawyer = JSON.parse(localStorage.getItem("lawyer"));
      if (!storedLawyer?._id) {
        navigate("/loginlawyer");
        return;
      }

      const response = await api.get(`/api/lawyers/${storedLawyer._id}`);
      const lawyerData = response.data;

      setLawyer(lawyerData);
      setEditedLawyer(lawyerData);
      setAreasOfPractice(lawyerData.areasOfPractice || []);
      setReviews(lawyerData.reviews || []);
    } catch (err) {
      console.error("Error fetching lawyer data:", err);
      setError("Failed to load profile data. Please try again later.");
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleNotification = () => {
    setShowNotification((toggle) => !toggle);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.patch(`/api/lawyers/${lawyer._id}`, {
        ...editedLawyer,
        languages: editedLawyer.languages || [],
        areasOfPractice: areasOfPractice,
        about: editedLawyer.about || "",
        experience: editedLawyer.experience || "",
        rates: editedLawyer.rates || "",
      });

      if (response.data) {
        setLawyer(response.data);
        localStorage.setItem("lawyer", JSON.stringify(response.data));
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        throw new Error("No data received from server");
      }
    } catch (err) {
      console.error("Error updating lawyer data:", err);
      setError("Failed to update profile. Please try again later.");
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedLawyer(lawyer);
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "languages") {
      // Split languages by comma and trim whitespace
      const languageArray = value.split(",").map((lang) => lang.trim());
      setEditedLawyer((prev) => ({
        ...prev,
        languages: languageArray,
      }));
    } else if (name === "experience") {
      // Ensure experience is a number
      const experienceValue = value.replace(/[^0-9]/g, "");
      setEditedLawyer((prev) => ({
        ...prev,
        experience: experienceValue,
      }));
    } else if (name === "rates") {
      // Allow numbers and currency symbols
      setEditedLawyer((prev) => ({
        ...prev,
        rates: value,
      }));
    } else {
      setEditedLawyer((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      toast.success("Practice area added");
    } else if (areasOfPractice.includes(newAreaOfPractice.trim())) {
      toast.warning("This practice area already exists");
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
    toast.info("Practice area removed");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddAreaOfPractice();
    }
  };

  let active = "profile";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#62B9CB]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchLawyerData}
          className="bg-[#62B9CB] text-white px-4 py-2 rounded-lg hover:bg-[#4a9ba8] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-gray-500 mb-4">No profile data found</div>
        <button
          onClick={() => navigate("/loginlawyer")}
          className="bg-[#62B9CB] text-white px-4 py-2 rounded-lg hover:bg-[#4a9ba8] transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <Link to="/lawyersettings">
              <img
                src={gear}
                className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                alt="Settings"
              />
            </Link>
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
          <LSideBar active={active} />
          {/* ACTION */}
          <div className="w-[80%] px-4 py-3">
            <p className="text-2xl font-semibold">Profile</p>
            <div className="flex mt-6 gap-2">
              <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-3/10 px-3 py-4 shadow-sm">
                <div className="flex flex-col gap-1 items-center justify-center">
                  <FaUserAlt className="text-5xl text-[#62B9CB]" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedLawyer.name || ""}
                      disabled
                      className="font-semibold text-xl text-center border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB] bg-gray-50"
                    />
                  ) : (
                    <p className="font-semibold text-xl">{lawyer.name}</p>
                  )}
                  <div className="flex flex-wrap gap-2 justify-center mt-1">
                    {areasOfPractice.length > 0 ? (
                      areasOfPractice.map((area, index) => (
                        <div
                          key={index}
                          className="bg-[#62B9CB] text-white px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-600 text-sm">
                        No practice areas specified
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 text-[#62B9CB] text-[13px] mt-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green-500 text-white py-2 px-6 border-0 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {saving ? <FaSpinner className="animate-spin" /> : null}
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="bg-red-500 text-white py-2 px-6 border-0 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center bg-teal-500 text-white py-2 px-14 border-0 rounded-lg mt-4 hover:bg-teal-600 transition-colors transform hover:scale-105 duration-200"
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
                        className="border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                      />
                    ) : (
                      <div>{lawyer.location || "Not provided"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Phone Number</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editedLawyer.phoneNumber || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                      />
                    ) : (
                      <div>{lawyer.phoneNumber || "Not provided"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Languages</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="languages"
                        value={editedLawyer.languages?.join(", ") || ""}
                        onChange={handleInputChange}
                        placeholder="Enter languages separated by commas"
                        className="border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                      />
                    ) : (
                      <div>
                        {lawyer.languages?.length > 0
                          ? lawyer.languages.join(", ")
                          : "Not provided"}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Experience</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={editedLawyer.experience || ""}
                        onChange={handleInputChange}
                        placeholder="Enter years of experience"
                        className="border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                      />
                    ) : (
                      <div>{lawyer.experience || "Not provided"}</div>
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
                        placeholder="Enter your rates"
                        className="border rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                      />
                    ) : (
                      <div>{lawyer.rates || "Not provided"}</div>
                    )}
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Member Since</div>
                    <div>{new Date(lawyer.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div>
                    <button className="flex items-center bg-[#62B9CB] text-white py-2 px-20 border-0 rounded-lg mt-8 hover:bg-[#4a9ba8] transition-colors">
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
                            onKeyPress={handleKeyPress}
                            placeholder="Add new practice area"
                            className="border rounded p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                          />
                          <button
                            onClick={handleAddAreaOfPractice}
                            className="bg-[#62B9CB] text-white px-4 py-2 rounded-lg hover:bg-[#4a9ba8] transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {areasOfPractice.map((area, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-[#62B9CB] text-white px-3 py-1 rounded-full hover:bg-[#4a9ba8] transition-colors"
                            >
                              <span>{area}</span>
                              <button
                                onClick={() => handleRemoveAreaOfPractice(area)}
                                className="text-white hover:text-red-200 transition-colors"
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
                              className="bg-[#62B9CB] text-white px-3 py-1 rounded-full hover:bg-[#4a9ba8] transition-colors"
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

              <div className="flex flex-col w-fit border-1 border-neutral-200 rounded-2xl px-4 py-4 shadow-sm">
                <div>
                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                    <p className="font-semibold text-xl mt-4">About</p>
                    {isEditing ? (
                      <div className="mt-2">
                        <textarea
                          name="about"
                          value={editedLawyer.about || ""}
                          onChange={handleInputChange}
                          className="text-neutral-600 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
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
                        {lawyer.about ? (
                          <p className="text-neutral-600 whitespace-pre-line">
                            {lawyer.about}
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

                  {/* Reviews Section */}
                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                    <p className="font-semibold text-xl mt-4">Client Reviews</p>
                    <div className="mt-4 space-y-4">
                      {lawyer.reviews && lawyer.reviews.length > 0 ? (
                        lawyer.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="border-b border-neutral-200 pb-4 last:border-b-0"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <img
                                src={pfp}
                                alt={review.userName}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-semibold">
                                  {review.userName}
                                </p>
                                <p className="text-sm text-neutral-500">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-neutral-600">{review.review}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-neutral-500 italic">
                          No reviews yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LawyerProfile;
