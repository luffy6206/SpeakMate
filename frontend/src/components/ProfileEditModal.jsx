import { useState } from "react";
import { ShipWheelIcon, ShuffleIcon, MapPinIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import toast from "react-hot-toast";


const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
    nativeLanguage: user?.nativeLanguage || "",
    learningLanguage: user?.learningLanguage || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="card bg-base-200 w-full max-w-full sm:max-w-xl md:max-w-2xl shadow-xl relative mx-2 sm:mx-auto">
        {/* CLOSE BUTTON */}
        <button className="absolute top-2 right-2 btn btn-sm btn-circle z-10" onClick={onClose}>
          ✕
        </button>
        <div className="card-body p-2 sm:p-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-1 w-full">
              {/* IMAGE PREVIEW */}
              <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full bg-base-300 overflow-hidden mx-auto">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent btn-xs sm:btn-sm">
                  <ShuffleIcon className="size-3 mr-1" />
                  Avatar
                </button>
              </div>
            </div>
            {/* FULL NAME */}
            <div className="form-control mb-1 w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>
            {/* BIO */}
            <div className="form-control mb-1 w-full">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>
            {/* LANGUAGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {/* NATIVE LANGUAGE */}
              <div className="form-control mb-1 w-full">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* LEARNING LANGUAGE */}
              <div className="form-control mb-1 w-full">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* LOCATION */}
            <div className="form-control mb-1 w-full">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/* EMAIL */}
            <div className="form-control mb-1 w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Email"
              />
            </div>
            <button className="btn btn-primary w-full btn-sm sm:btn-md" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
