const fileFormat = (url) => {
  const fileExtension = url.split('.').pop().toLowerCase();

  if (['mp4', 'webm', 'ogg'].includes(fileExtension)) return 'video';
  if (['mp3', 'wav'].includes(fileExtension)) return 'audio';
  if (['pdf', 'jpg', 'jpeg', 'gif', 'png'].includes(fileExtension)) return 'image';

  return 'file';
};

const transformImage = (url = '', width = 100) => {
  if (!url) return ''; // If no URL is provided, return empty string

  // Assuming Cloudinary URLs follow this pattern
  const cloudinaryBaseUrl = "https://res.cloudinary.com/";

  // Check if URL already has a `upload/` segment
  if (url.includes("upload/")) {
    // Replace or insert the transformation part after "upload/"
    const transformedUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
    return transformedUrl;
  }

  // If the URL is not a valid Cloudinary URL, return it as is
  return url;
};

const getOrSaveFromStorage = (key, value, get) => {

  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else
    localStorage.setItem(key, JSON.stringify(value));

}




export { fileFormat, transformImage, getOrSaveFromStorage };
