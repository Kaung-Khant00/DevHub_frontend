/*   !!  This code is generated from AI . Credit to ChatGPT and I understand it   !! */

import React, { useRef, useState, useMemo, useEffect } from "react";
import { FaImage, FaFileAlt, FaPaperPlane, FaTrashAlt, FaTimes, FaCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { RiEditFill } from "react-icons/ri";
import { editPost, fetchSpecificPost } from "../../../Redux/post/postSlice";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loading, error, data } = useSelector((state) => state.post.edit);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  const tab = useMemo(() => {
    const p = new URLSearchParams(search);
    return p.get("tab");
  }, [search]);

  // if tab is empty => default behavior (all sections open on mobile)
  const isOpen = (section) => {
    return tab === section;
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [attachedFile, setAttachedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [deletingPrevious, setDeletingPrevious] = useState({
    image: false,
    file: false,
  });

  const imageInputRef = useRef();
  const fileInputRef = useRef();
  const codeRef = useRef();

  useEffect(() => {
    dispatch(fetchSpecificPost(id, setPost));
  }, [dispatch, id]);
  useEffect(() => {
    if (data) {
      setPost(data);
      if (data.image) {
        setImagePreview(data?.image_url);
      }
      setTags(data.tags);
    }
  }, [data]);

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

  function handleEdit() {
    const form = {
      title: post.title,
      content: post.content,
      image: imageFile,
      file: attachedFile,
      code: post.code,
      codeLang: post.code_lang,
      tags: tags,
      isDeleteImage: deletingPrevious.image,
      isDeleteFile: deletingPrevious.file,
      user_id: data.user.id,
    };
    console.log(form);
    dispatch(editPost({ id: post.id, form, navigate }));
  }

  return (
    <div className="min-h-screen bg-base-200 pt-4 pb-6 px-4 w-full">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <ReturnBackButton defaultBackTo={-1} except={"/post/edit/"} />
          <h1 className="text-xl md:text-2xl font-semibold text-primary">Edit Post</h1>
        </div>
      </header>
      {loading && (
        <div className="h-30 flex flex-col justify-center items-center gap-1">
          <div className="text-primary text-lg">Please wait</div>
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      )}
      {data && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: main column */}
          <div className="space-y-5">
            {/* Content Card */}
            <section
              className={`collapse ${
                isOpen("content") ? "collapse-open" : ""
              } md:collapse-open bg-base-100 border border-base-300 shadow-sm rounded-lg`}>
              <input type="checkbox" className="hidden" defaultChecked={isOpen("content")} />
              <div className="card-body p-4">
                <div>
                  <input
                    type="text"
                    className="input input-bordered w-full mb-3 font-bold text-lg"
                    placeholder="Title your post"
                    value={post?.title || ""}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-semibold">Content</h2>
                  <span className="text-sm text-base-content/60 hidden md:inline">
                    Characters: {post?.content?.length}
                  </span>
                </div>

                <p className="text-sm text-base-content/60 mb-3 md:hidden">
                  Main text that will appear in the post. Keep it clear and focused.
                </p>

                <textarea
                  rows={3}
                  value={post?.content || ""}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="What's on your mind?"
                  className="textarea w-full h-20 resize-y font-sans text-sm"
                />
                {error?.content && <div className="text-sm text-error mt-2">{error.content}</div>}

                <div className="mt-3 flex items-center gap-3">
                  <button onClick={() => setPost({ ...post, content: "" })} className="btn btn-ghost btn-sm">
                    Clear
                  </button>
                  <div className="ml-auto text-sm text-base-content/60 md:hidden">
                    Characters: {post?.content?.length}
                  </div>
                </div>
                {error?.form && <div className="text-sm text-error mt-2">{error.form}</div>}
              </div>
            </section>

            {/* Code Card */}
            <section
              className={`collapse ${
                isOpen("code") ? "collapse-open" : ""
              } md:collapse-open bg-base-100 border border-base-300 shadow-sm rounded-lg`}>
              <input type="checkbox" className="hidden" defaultChecked={isOpen("code")} />
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-semibold flex items-center gap-2">
                    <FaCode /> Code Snippet
                  </h2>
                  <input
                    type="text"
                    value={post?.code_lang || ""}
                    onChange={(e) => setPost({ ...post, code_lang: e.target.value })}
                    className="input input-sm w-full max-w-[150px] text-sm"
                    placeholder="Enter the Language"
                  />
                </div>

                <textarea
                  ref={codeRef}
                  rows={3}
                  value={post?.code || ""}
                  onChange={(e) => setPost({ ...post, code: e.target.value })}
                  placeholder={"Paste your code here."}
                  className="textarea textarea-bordered w-full h-20 resize-y font-mono text-sm mt-2"
                />
                {error?.code && <div className="text-sm text-error mt-2">{error.code}</div>}

                {post?.code && (
                  <div className="collapse collapse-arrow border border-base-300 bg-base-200/60 mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-medium flex items-center gap-2">
                      <FaCode /> View code snippet
                    </div>
                    <div className="collapse-content">
                      <pre className="bg-base-300/60 p-3 rounded-lg overflow-x-auto text-sm">
                        <code>{post?.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex justify-end">
                  <button onClick={() => setPost({ ...post, code: "" })} className="btn btn-ghost btn-sm">
                    Clear Code
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: sidebar (balanced width) */}
          <aside className="space-y-5">
            {/* Media (Image + Attachment grouped) */}
            <section className="bg-base-100 border border-base-300 shadow-sm rounded-lg">
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
                    style={{ minHeight: 120 }}>
                    <div className="flex items-center gap-2">
                      <FaImage className="text-xl text-primary" />
                      <div>
                        <div className="font-medium">Drop an image here</div>
                      </div>
                    </div>

                    {imagePreview ? (
                      <div className=" mt-3 w-full">
                        <div className="flex items-center justify-center gap-2">
                          <img src={imagePreview} alt="preview" className=" rounded max-h-36 object-cover" />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 text-sm text-base-content/70">No image attached</div>
                    )}

                    <div className="mt-3 w-full flex">
                      <label
                        className="btn btn-outline btn-sm flex-1 gap-1"
                        onClick={() => imageInputRef.current && imageInputRef.current.click()}>
                        <FaImage className="mr-2 text-primary" /> Upload Image
                      </label>
                      {post?.image && (
                        <div className="flex-1">
                          {imageFile || deletingPrevious.image ? (
                            <button
                              onClick={() => {
                                setDeletingPrevious((pre) => ({
                                  ...pre,
                                  image: false,
                                }));
                                setImageFile(null);
                                setImagePreview(data?.image_url);
                              }}
                              className="btn btn-sm btn-error mb-2 w-full text-white">
                              Undo
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-error mb-2 w-full text-white"
                              onClick={() => {
                                setDeletingPrevious((pre) => ({
                                  ...pre,
                                  image: true,
                                }));
                                setImageFile(null);
                                setImagePreview(null);
                              }}>
                              Remove image
                            </button>
                          )}
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/git"
                        ref={imageInputRef}
                        onChange={(e) => onImageSelect(e)}
                        className="hidden"
                      />
                    </div>

                    {error?.image && <div className="text-sm text-error mt-2">{error.image}</div>}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold">Attachment</h3>
                  <p className="text-sm text-base-content/60 mb-2 md:hidden">
                    Attach a file (docs, zip, pdf). Max 10MB in this demo.
                  </p>

                  <div className="flex flex-col gap-3 items-stretch justify-center h-full">
                    {attachedFile ? (
                      <div className="bg-base-200 p-3 rounded flex items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-3">
                          <FaFileAlt className="text-lg text-primary" />
                          <div>
                            <div className="text-sm font-medium">{attachedFile.name}</div>
                            <div className="text-xs text-base-content/70">
                              {Math.round(attachedFile.size / 1024)} KB
                            </div>
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-ghost btn-xs" onClick={() => setAttachedFile(null)}>
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-base-content/70">
                        {post?.file ? (
                          <div>Upload new file will delete the previous file ({post.file.split("/")[1]})</div>
                        ) : (
                          <div>No File uploaded yet</div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-1">
                      <label
                        className="btn btn-outline btn-sm flex-1"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                        <FaFileAlt className="mr-2 text-primary" /> Upload File
                      </label>
                      {post?.file && (
                        <div className="flex-1">
                          <button
                            className="btn btn-sm btn-error mb-2 w-full text-white"
                            onClick={() => {
                              setDeletingPrevious((pre) => ({
                                ...pre,
                                file: true,
                              }));
                              setAttachedFile(null);
                            }}>
                            Remove File
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".html,.css,.scss,.sass,.js,.ts,.jsx,.tsx,.vue,
.php,.py,.java,.c,.cpp,.h,.cs,.go,.rb,.sh,
.json,.xml,.yml,.yaml,.sql,.csv,.env,
.md,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,
.zip,.rar,.7z,.tar,.gz"
                        onChange={(e) => onFileSelect(e)}
                        className="hidden"
                      />
                    </div>

                    {error?.file && <div className="text-sm text-error mt-2">{error.file}</div>}
                    {/* Tag error hint */}
                    {error?.tags && <div className="text-sm text-error mt-2">{error.tags}</div>}
                  </div>
                </div>
              </div>
            </section>

            {/* Tags Card */}
            <section
              className={`collapse ${
                isOpen("tags") ? "collapse-open" : ""
              } md:collapse-open bg-base-100 border border-base-300 shadow-sm rounded-lg`}>
              <input type="checkbox" className="hidden" defaultChecked={isOpen("tags")} />
              <div className="card-body p-4">
                <h2 className="text-md font-semibold">Tags</h2>
                <p className="text-sm text-base-content/60 mb-3 md:hidden">
                  Add keywords to help others discover your post.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {tags &&
                    tags.map((t, i) => (
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
            </section>

            <section className=" bg-base-100 border border-base-300 shadow-sm rounded-lg">
              <div className="card-body p-4 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(post?.image_url);
                      setAttachedFile(null);
                      setPost(data);
                      setTags(data?.tags);
                    }}>
                    <FaTrashAlt /> Reset All
                  </button>
                  <button className="btn btn-primary" onClick={() => handleEdit()} disabled={loading}>
                    {loading ? (
                      <div className="flex items-center">
                        <div className="loading loading-ring loading-md"></div>
                        Editing...
                      </div>
                    ) : (
                      <>
                        <RiEditFill className="mr-2" /> Edit
                      </>
                    )}
                  </button>
                </div>
                {error?.form && <div className="sm:hidden block text-sm text-error mt-2 font-bold">{error.form}</div>}
              </div>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}
