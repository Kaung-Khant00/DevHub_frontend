/*   !!  This code is generated from AI . Credit to ChatGPT and I understand it   !! */

import React, { useRef, useState, useMemo, useEffect } from "react";
import { FaImage, FaFileAlt, FaPaperPlane, FaTrashAlt, FaTimes, FaCode, FaArrowLeft } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import ImageWIthSkeleton from "../../Components/Common/ImageWIthSkeleton";
import { fetchGroupDetail } from "../../Redux/group/groupSlice";
import CreateGroupPostSkeleton from "../SkeletonLoading/CreateGroupPostSkeleton";
// import { createPost } from "../../../Redux/post/postSlice";

export default function CreateGroupPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { search } = useLocation();
  const { loading, error } = useSelector((state) => state.post.create);
  const { data: groupData, loading: detailLoading } = useSelector((state) => state.group.detail);

  // parse `tab` query param; allow comma-separated values (e.g. ?tab=code,image)
  const tab = useMemo(() => {
    const p = new URLSearchParams(search);
    return p.get("tab");
  }, [search]);

  // --- Local state (kept from original) ---
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

  // Guards so attempt-to-open actions happen only once
  const hasTriedOpenImageRef = useRef(false);
  const hasTriedOpenFileRef = useRef(false);
  const hasTriedFocusCodeRef = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tab === "code" && codeRef.current && !hasTriedFocusCodeRef.current) {
      hasTriedFocusCodeRef.current = true;
      setTimeout(() => {
        codeRef.current.focus();
        const len = codeRef.current.value.length;
        codeRef.current.setSelectionRange(len, len);
      }, 120);
    }

    if (tab === "image" && imageInputRef.current && !hasTriedOpenImageRef.current) {
      hasTriedOpenImageRef.current = true;
      setTimeout(() => {
        imageInputRef.current.click();
      }, 200);
    }
    if (tab === "file" && fileInputRef.current && !hasTriedOpenFileRef.current) {
      hasTriedOpenFileRef.current = true;
      setTimeout(() => {
        fileInputRef.current.click();
      }, 200);
    }
  }, [tab]);

  useEffect(() => {
    dispatch(fetchGroupDetail(id));
  }, []);
  // --- Handlers (kept) ---
  function onImageSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
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

  // Publish: inject group_id and keep original createPost dispatch
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
      group_id: id ?? null, // NEW: mark the post as belonging to this group
    };

    // dispatch(createPost({ form, navigate }));
  }

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-sm">
      {detailLoading ? (
        <CreateGroupPostSkeleton />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-4">
            <Link to={`/group/${id}`} className="btn btn-ghost btn-square mb-2" aria-label="Back" title="Back">
              <FaArrowLeft className="w-10 h-5" />
            </Link>
            <a
              className="w-12 h-12 rounded-lg overflow-hidden ring ring-primary/30 block flex-shrink-0"
              title={`View ${groupData?.name}`}>
              <ImageWIthSkeleton
                src={groupData?.image_url}
                alt={groupData?.name}
                className="w-full h-full object-cover"
              />
            </a>

            <div className="flex-1">
              <div className="text-xs text-base-content/60">Posting to</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold text-primary">{groupData?.name}</div>
                <div className="text-sm text-muted"> · 2 members</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* LEFT: main content */}
            <div className="lg:col-span-3 space-y-4">
              {/* Title */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
                <input
                  type="text"
                  className="input input-bordered w-full mb-2 font-semibold text-lg"
                  placeholder="Give your post a title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* Content */}
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Share something with ${groupData?.name}`}
                  className="textarea textarea-bordered w-full resize-y font-sans text-sm"
                />
                {error?.content && <div className="text-sm text-error mt-2">{error.content}</div>}
              </div>
              {/* Code snippet (optional) */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FaCode /> Code Snippet
                  </div>
                  <input
                    type="text"
                    value={codeLang}
                    onChange={(e) => setCodeLang(e.target.value)}
                    className="input input-sm max-w-[160px] text-sm"
                    placeholder="Language (optional)"
                  />
                </div>

                <textarea
                  ref={codeRef}
                  rows={3}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={"Paste your code here (optional)."}
                  className="textarea textarea-bordered w-full h-28 resize-y font-mono text-sm"
                />

                {code && (
                  <div className="collapse collapse-arrow border border-base-300 bg-base-200/60 mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-medium">View code snippet</div>
                    <div className="collapse-content">
                      <pre className="bg-base-300/60 p-3 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: attachments & tags */}
            <aside className="space-y-4 lg:col-span-2">
              {/* Image uploader */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
                <h3 className="text-md font-semibold mb-2">Image</h3>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-dashed border-2 border-base-300 rounded-lg p-3 flex flex-col items-center justify-center text-center bg-base-100"
                  style={{ minHeight: 110 }}>
                  <div className="flex items-center gap-2 text-sm">
                    <FaImage className="text-primary" />
                    <div className="font-medium">Drop an image or upload</div>
                  </div>

                  {imagePreview ? (
                    <div className="mt-3 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <img src={imagePreview} alt="preview" className="rounded max-h-36 object-cover" />
                        <div className="flex flex-col items-end">
                          <button
                            className="btn btn-xs btn-ghost mb-2"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}>
                            Remove
                          </button>
                          <div className="text-xs text-base-content/70">Image ready to upload</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-base-content/70">No image attached</div>
                  )}

                  <div className="mt-3 w-full flex gap-2">
                    <label
                      className="btn btn-outline btn-sm flex-1"
                      onClick={() => imageInputRef.current && imageInputRef.current.click()}>
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

                  {error?.image && <div className="text-sm text-error mt-2">{error.image}</div>}
                </div>
              </div>

              {/* File attachment */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-semibold">Attachment</h3>
                  <label className="input input-sm max-w-50">
                    <CiFileOn />
                    <input
                      type="text"
                      className="grow"
                      disabled={!attachedFile}
                      value={fileInfo?.name}
                      onChange={(e) => setFileInfo((pre) => ({ ...pre, name: e.target.value }))}
                      placeholder="Enter File Name"
                    />
                  </label>
                </div>

                {attachedFile ? (
                  <div className="bg-base-200 p-3 rounded flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="text-lg text-primary" />
                      <div>
                        <div className="text-sm font-medium">{attachedFile.name}</div>
                        <div className="text-xs text-base-content/70">{Math.round(attachedFile.size / 1024)} KB</div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-ghost btn-xs" onClick={() => setAttachedFile(null)}>
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-base-content/70">No file attached</div>
                )}

                <div className="flex gap-2 mt-3">
                  <label
                    className="btn btn-outline btn-sm flex-1"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    <FaFileAlt className="mr-2 text-primary" /> Upload File
                  </label>
                  {attachedFile && (
                    <button className="btn btn-error text-white btn-sm flex-1" onClick={() => setAttachedFile(null)}>
                      Remove File
                    </button>
                  )}
                  <input type="file" ref={fileInputRef} onChange={(e) => onFileSelect(e)} className="hidden" />
                </div>

                {error?.file && <div className="text-sm text-error mt-2">{error.file}</div>}
                {error?.tags && <div className="text-sm text-error mt-2">{error.tags}</div>}
              </div>

              {/* Tags */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3">
                <h3 className="text-md font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((t, i) => (
                    <div key={i} className="badge badge-outline py-2 px-2 flex items-center gap-2">
                      <span className="text-sm">{t}</span>
                      <button onClick={() => removeTag(i)} className="btn btn-ghost btn-xs">
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

              {/* Actions (mobile-friendly bottom row) */}
              <div className="bg-base-100 border border-base-300 shadow-sm rounded-lg p-3 flex justify-center ">
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setContent("");
                      setImageFile(null);
                      setImagePreview(null);
                      setAttachedFile(null);
                      setTags([]);
                      setCode("");
                    }}>
                    <FaTrashAlt /> Clear
                  </button>

                  <button className="btn btn-primary btn-sm" onClick={() => publish()} disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="loading loading-ring loading-sm"></div>
                        Publishing...
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Publish to {groupData?.name}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error?.form && <div className="block sm:hidden text-sm text-error mt-2 font-bold">{error.form}</div>}
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
