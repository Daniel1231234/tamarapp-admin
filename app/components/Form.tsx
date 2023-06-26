"use client";

import { useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import CustomEmojiPicker from "./EmojiPicker";

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [openEmoji, setOpenEmoji] = useState(false);

  useOnClickOutside(formRef, () => setOpenEmoji(false));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mediaType === "image" && !imageUrl) {
        alert("לא לשכוח תמונה :)");
        return;
      }
      const newNote = await axios.post("/api/send", {
        name,
        note,
        phone,
        imageUrl,
        mediaType,
        youtubeUrl,
      });
      console.log(newNote);

      setName("");
      setNote("");
      setPhone("");
      setImageUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (results: any) => {
    const imageUrl = results.info.secure_url;
    setImageUrl(imageUrl);
  };

  const handleEmojiClick = (emoji: string) => {
    console.log(emoji);
    setNote((prev: string) => (prev += emoji));
    setOpenEmoji(false);
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMediaType(e.target.value as "image" | "video");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-slate-300 p-8 rounded-lg"
      ref={formRef}
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          שם מלא
        </label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700"
        >
          פתק
        </label>
        <div className="relative">
          {openEmoji && (
            <CustomEmojiPicker handleEmojiClick={handleEmojiClick} />
          )}
          <TextAreaAutoSize
            required
            id="note"
            minRows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            className=""
            title="Emoji picker"
            onClick={() => setOpenEmoji(true)}
          >
            😁
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          מספר טלפון
        </label>
        <input
          required
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mediaType"
          className="block text-sm font-medium text-gray-700"
        >
          בחר סוג מדיה
        </label>
        <select
          id="mediaType"
          value={mediaType}
          onChange={handleMediaTypeChange}
          className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="image">תמונה</option>
          <option value="video">וידאו</option>
        </select>
      </div>
      {mediaType === "image" ? (
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            תמונה
          </label>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="wz721uu6"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label
            htmlFor="youtubeUrl"
            className="block text-sm font-medium text-gray-700"
          >
            קישור לוידאו ב-
            <span
              className="text-indigo-500 cursor-pointer hover:text-indigo-800"
              onClick={() => window.open("https://www.youtube.com")}
            >
              YouTube
            </span>
          </label>
          <input
            required
            type="text"
            id="youtubeUrl"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        שלח
      </button>
    </form>
  );
};

export default Form;
