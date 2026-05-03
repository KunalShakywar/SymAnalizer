import Default from "./default/image.png"


const ProfileImage = ({ src, alt = "profile", size = "w-12 h-12" }) => {
  return (
    <img
      src={src || Default}
      alt={alt}
      className={`${size} rounded-full border-2 border-gray-300 object-cover shadow-sm`}
    />
  );
};

export default ProfileImage;
