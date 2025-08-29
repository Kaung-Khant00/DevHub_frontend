/*   !!  This code is generated from AI . Credit to ChatGPT and I understand it   !! */

import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  FaImage,
  FaFileAlt,
  FaPaperPlane,
  FaTag,
  FaTrashAlt,
  FaTimes,
  FaCode,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createPost } from "../../../Redux/post/postSlice";

export default function CreatePost() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loading, error } = useSelector((state) => state.post.create);

  // parse `tab` query param; allow comma-separated values (e.g. ?tab=code,image)

  const tab = useMemo(() => {
    const p = new URLSearchParams(search);
    return p.get("tab");
  }, [search]);

  // if tab is empty => default behavior (all sections open on mobile)
  const isOpen = (section) => {
    return tab === section;
  };

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ name: "", size: "", type: "" });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [code, setCode] = useState("");
  const [codeLang, setCodeLang] = useState();

  const imageInputRef = useRef();
  const fileInputRef = useRef();
  const codeRef = useRef();

  // Guards to ensure the actions (focus/click) run only once even if component mounts twice
  const hasTriedOpenImageRef = useRef(false);
  const hasTriedOpenFileRef = useRef(false);
  const hasTriedFocusCodeRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Focus code textarea if requested, but only once
    if (tab === "code" && codeRef.current && !hasTriedFocusCodeRef.current) {
      hasTriedFocusCodeRef.current = true;
      // small timeout to ensure element is mounted and visible
      setTimeout(() => {
        codeRef.current.focus();
        const len = codeRef.current.value.length;
        codeRef.current.setSelectionRange(len, len);
      }, 120);
    }

    // Attempt to open image file picker if requested (best-effort), but only once
    if (
      tab === "image" &&
      imageInputRef.current &&
      !hasTriedOpenImageRef.current
    ) {
      hasTriedOpenImageRef.current = true;
      setTimeout(() => {
        imageInputRef.current.click();
      }, 200);
    }
    if (
      tab === "file" &&
      fileInputRef.current &&
      !hasTriedOpenFileRef.current
    ) {
      hasTriedOpenFileRef.current = true;
      setTimeout(() => {
        fileInputRef.current.click();
      }, 200);
    }
  }, [tab]);

  function onImageSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    console.log(file);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function onFileSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFileInfo({
      name: file.name,
      type: file.type,
      size: file.size,
    });
    setAttachedFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function addTagFromInput() {
    const t = tagInput.trim();
    if (!t) return;
    if (tags.includes(t)) return setTagInput("");
    setTags((s) => [...s, t]);
    setTagInput("");
  }

  function removeTag(index) {
    setTags((s) => s.filter((_, i) => i !== index));
  }

  async function publish() {
    const form = {
      title,
      content,
      image: imageFile,
      file: attachedFile,
      fileInfo,
      code,
      codeLang,
      tags,
    };
    console.log("PUBLISHING");
    dispatch(createPost({ form, navigate }));
  }

  return (
    <div className="min-h-screen bg-base-200 pt-4 pb-6 px-4 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            Back
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-primary">
            Create a Post
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </header>
      <div className="w-full flex gap-6">
        {/* LEFT: main column */}
        <div className="flex-3 space-y-5">
          {/* Content Card */}
          <section
            className={`collapse ${
              isOpen("content") ? "collapse-open" : ""
            } md:collapse-open bg-base-100 border border-base-300 shadow-sm rounded-lg`}
          >
            <input
              type="checkbox"
              className="hidden"
              defaultChecked={isOpen("content")}
            />
            <div className="card-body p-4">
              <div>
                <input
                  type="text"
                  className="input input-bordered w-full mb-3 font-semibold text-lg"
                  placeholder="title your post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold">Content</h2>
                <span className="text-sm text-base-content/60 hidden md:inline">
                  Characters: {content.length}
                </span>
              </div>

              <p className="text-sm text-base-content/60 mb-3 md:hidden">
                Main text that will appear in the post. Keep it clear and
                focused.
              </p>

              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="textarea w-full h-20 resize-y font-sans text-sm"
              />
              {error?.content && (
                <div className="text-sm text-error mt-2">{error.content}</div>
              )}

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setContent("")}
                  className="btn btn-ghost btn-sm"
                >
                  Clear
                </button>
                <div className="ml-auto text-sm text-base-content/60 md:hidden">
                  Characters: {content.length}
                </div>
              </div>
              {error?.form && (
                <div className="text-sm text-error mt-2">{error.form}</div>
              )}
            </div>
          </section>

          {/* Code Card */}
          <section
            className={`bg-base-100 border border-base-300 shadow-sm rounded-lg`}
          >
            <input
              type="checkbox"
              className="hidden"
              defaultChecked={isOpen("code")}
            />
            <div className=" p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold flex items-center gap-2">
                  <FaCode /> Code Snippet
                </h2>
                <input
                  type="text"
                  value={codeLang}
                  onChange={(e) => setCodeLang(e.target.value)}
                  className="input input-sm w-full max-w-[150px] text-sm"
                  placeholder="Enter the Language"
                />
              </div>

              <textarea
                ref={codeRef}
                rows={3}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={"Paste your code here."}
                className="textarea textarea-bordered w-full h-20 resize-y font-mono text-sm mt-2"
              />
              {error?.code && (
                <div className="text-sm text-error mt-2">{error.code}</div>
              )}

              {code && (
                <div className="collapse collapse-arrow border border-base-300 bg-base-200/60 mt-3">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium flex items-center gap-2">
                    <FaCode /> View code snippet
                  </div>
                  <div className="collapse-content">
                    <pre className="bg-base-300/60 p-3 rounded-lg overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              )}

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setCode("")}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Code
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: sidebar (balanced width) */}
        <aside className="flex-2 space-y-5">
          {/* Media (Image + Attachment grouped) */}
          <section className="bg-base-100 border border-base-300 shadow-sm rounded-lg pb-4">
            <div className="card-body p-4 grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-md font-semibold">Image</h3>
                <p className="text-sm text-base-content/60 mb-2 md:hidden">
                  Drag & drop or upload an image to include in the post.
                </p>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-dashed border-2 border-base-300 rounded-lg p-3 flex flex-col items-center justify-center text-center bg-base-100"
                  style={{ minHeight: 120 }}
                >
                  <div className="flex items-center gap-2">
                    <FaImage className="text-xl text-primary" />
                    <div>
                      <div className="font-medium">Drop an image here</div>
                    </div>
                  </div>

                  {imagePreview ? (
                    <div className="mt-3 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="rounded max-h-36 object-cover"
                        />
                        <div className="flex flex-col items-end">
                          <button
                            className="btn btn-xs btn-ghost mb-2"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                          >
                            Remove
                          </button>
                          <div className="text-xs text-base-content/70">
                            Image ready to upload
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-base-content/70">
                      No image attached
                    </div>
                  )}

                  <div className="mt-3 w-full flex gap-2">
                    <label
                      className="btn btn-outline btn-sm flex-1"
                      onClick={() =>
                        imageInputRef.current && imageInputRef.current.click()
                      }
                    >
                      <FaImage className="mr-2 text-primary" /> Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      ref={imageInputRef}
                      onChange={(e) => onImageSelect(e)}
                      className="hidden"
                    />
                  </div>

                  {error?.image && (
                    <div className="text-sm text-error mt-2">{error.image}</div>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between">
                  <h3 className="text-md font-semibold">Attachment</h3>
                  <input
                    type="text"
                    className="input input-sm max-w-40"
                    disabled={!attachedFile}
                    value={fileInfo?.name}
                    onChange={(e) =>
                      setFileInfo((pre) => ({ ...pre, name: e.target.value }))
                    }
                    placeholder="Enter File Name"
                  />
                </div>
                <p className="text-sm text-base-content/60 mb-2 md:hidden">
                  Attach a file (docs, zip, pdf). Max 10MB in this demo.
                </p>

                <div className="flex flex-col gap-3 items-stretch justify-center h-full">
                  {attachedFile ? (
                    <div className="bg-base-200 p-3 rounded flex items-center justify-between gap-3 w-full">
                      <div className="flex items-center gap-3">
                        <FaFileAlt className="text-lg text-primary" />
                        <div>
                          <div className="text-sm font-medium">
                            {attachedFile.name}
                          </div>
                          <div className="text-xs text-base-content/70">
                            {Math.round(attachedFile.size / 1024)} KB
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => setAttachedFile(null)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-base-content/70">
                      No file attached
                    </div>
                  )}

                  <div className="flex gap-2">
                    <label
                      className="btn btn-outline btn-sm flex-1"
                      onClick={() =>
                        fileInputRef.current && fileInputRef.current.click()
                      }
                    >
                      <FaFileAlt className="mr-2 text-primary" /> Upload File
                    </label>
                    {attachedFile && (
                      <button
                        className="btn btn-error text-white btn-sm flex-1"
                        onClick={() => setAttachedFile(null)}
                      >
                        Remove File
                      </button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => onFileSelect(e)}
                      className="hidden"
                    />
                  </div>

                  {error?.file && (
                    <div className="text-sm text-error mt-2">{error.file}</div>
                  )}
                  {/* Tag error hint */}
                  {error?.tags && (
                    <div className="text-sm text-error mt-2">{error.tags}</div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Tags Card */}
          <section
            className={`collapse ${
              isOpen("tags") ? "collapse-open" : ""
            } md:collapse-open bg-base-100 border border-base-300 shadow-sm rounded-lg`}
          >
            <input
              type="checkbox"
              className="hidden"
              defaultChecked={isOpen("tags")}
            />
            <div className="card-body p-4">
              <h2 className="text-md font-semibold">Tags</h2>
              <p className="text-sm text-base-content/60 mb-3 md:hidden">
                Add keywords to help others discover your post.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t, i) => (
                  <div
                    key={i}
                    className="badge badge-outline py-2 px-2 flex items-center gap-2"
                  >
                    <span className="text-sm">{t}</span>
                    <button
                      onClick={() => removeTag(i)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}

                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTagFromInput();
                    }
                    if (e.key === "Backspace" && tagInput === "") {
                      setTags((s) => s.slice(0, s.length - 1));
                    }
                  }}
                  placeholder="Add a tag and press Enter (e.g. javascript, react)"
                  className="input input-sm input-bordered w-full"
                />
              </div>
            </div>
          </section>

          <section className=" bg-base-100 border border-base-300 shadow-sm rounded-lg">
            <div className="card-body p-4 flex items-center justify-between">
              <div className="text-sm text-base-content/70">
                Preview, save or publish your post when ready.
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setContent("");
                    setImageFile(null);
                    setImagePreview(null);
                    setAttachedFile(null);
                    setTags([]);
                    setCode("");
                  }}
                >
                  <FaTrashAlt /> Clear All
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => publish()}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="loading loading-ring loading-md"></div>
                      Publishing...
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Publish
                    </>
                  )}
                </button>
              </div>
              {error?.form && (
                <div className="sm:hidden block text-sm text-error mt-2 font-bold">
                  {error.form}
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
