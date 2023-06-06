"use client";

import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newNote = await axios.post("/api/send", {
        name,
        note,
        phone,
        imageUrl,
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-slate-300 p-8 rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          שם מלא
        </label>
        <input
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
        <TextAreaAutoSize
          id="note"
          minRows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          מספר טלפון
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
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
