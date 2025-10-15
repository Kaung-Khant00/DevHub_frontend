import { useRef, useState, useEffect, useMemo } from "react";
import { FaImage, FaPaperPlane, FaTrashAlt, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createGroup } from "../../Redux/group/groupSlice";

export default function CreateGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.group.create);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const imageInputRef = useRef();
  const dropRef = useRef();

  useEffect(() => {
    // cleanup object URL
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleImageSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    dropRef.current.classList.remove("border", "border-dashed", "border-primary");
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
    dropRef.current.classList.add("border-2", "border-dashed", "border-primary");
  }
  function handleDragLeave() {
    console.log("Edit");
    dropRef.current.classList.remove("border", "border-dashed", "border-primary");
  }

  function addTagFromInput() {
    const t = tagInput.trim().toLowerCase();
    if (!t) return setTagInput("");
    if (tags.includes(t)) return setTagInput("");
    setTags((s) => [...s, t]);
    setTagInput("");
  }

  function removeTag(index) {
    setTags((s) => s.filter((_, i) => i !== index));
  }

  async function createGroupApi(e) {
    e.preventDefault();
    try {
      await dispatch(createGroup({ name, description, image: imageFile, tags })).unwrap();
      navigate("/group");
      clearAll();
    } catch (err) {
      console.error(err);
    }
  }

  function clearAll() {
    setName("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setTags([]);
    setTagInput("");
  }

  const nameChars = useMemo(() => (name ? name.length : 0), [name]);

  return (
    <div className="min-h-screen bg-base-200 pt-4 pb-6 px-4 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/group`} className="btn btn-ghost btn-square" aria-label="Back" title="Back">
            <FaArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold text-primary">Create a Group</h1>
        </div>
      </header>

      <form onSubmit={createGroupApi} className="space-y-5">
        <section className="bg-base-100 border border-base-300 shadow-sm rounded-lg">
          <div className="card-body p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Group name</span>
                  <span className="label-text text-sm text-base-content/60">{nameChars} chars</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input input-bordered w-full ${error?.field === "name" ? "input-error" : ""}`}
                  placeholder="Enter group name"
                  maxLength={80}
                />

                {error?.name && <div className="text-sm text-error mt-2">{error.name}</div>}

                <label className="label mt-4">
                  <span className="label-text font-medium">Description</span>
                  <span className="label-text text-sm text-base-content/60">
                    Optional — a short summary for the group
                  </span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full h-28 resize-y text-sm"
                  placeholder="Describe this group (what it's for, rules, topics)"
                />
                {error?.description && <div className="text-sm text-error mt-2">{error.description}</div>}
                {/* Tags input */}
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text font-medium">Tags</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((t, i) => (
                      <>
                        <div key={i} className="badge badge-primary py-2 px-3 flex items-center gap-2 overflow-hidden">
                          <span className="text-sm">{t}</span>
                          <button type="button" className="btn btn-ghost btn-xs" onClick={() => removeTag(i)}>
                            <FaTimes />
                          </button>
                        </div>
                      </>
                    ))}

                    <input
                      value={tagInput}
                      onChange={(e) => {
                        if (e.target.value.length < 25) setTagInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTagFromInput();
                        }
                        if (e.key === "Backspace" && tagInput === "") {
                          setTags((s) => s.slice(0, s.length - 1));
                        }
                      }}
                      placeholder="Add a tag and press Enter"
                      className="input input-sm input-bordered max-w-[180px]"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="label">
                  <span className="label-text font-medium">Image</span>
                </label>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  ref={dropRef}
                  className="border-dashed border-2 border-base-300 rounded-lg p-3 flex flex-col items-center justify-center text-center bg-base-100"
                  style={{ minHeight: 160 }}>
                  <div className="flex items-center gap-2">
                    <FaImage className="text-xl text-primary" />
                    <div className="font-medium">Group Cover</div>
                  </div>

                  {imagePreview ? (
                    <div className="mt-3 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <img src={imagePreview} alt="preview" className="rounded max-h-36 object-cover w-full" />
                      </div>
                      <div className="mt-2 w-full flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm flex-1"
                          onClick={() => imageInputRef.current && imageInputRef.current.click()}>
                          Change
                        </button>
                        <button
                          type="button"
                          className="btn btn-error btn-sm text-white flex-1"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-base-content/70">No image selected</div>
                  )}

                  <div className="mt-3 w-full flex gap-2">
                    <label
                      className="btn btn-outline btn-sm flex-1"
                      onClick={() => imageInputRef.current && imageInputRef.current.click()}>
                      <FaImage className="mr-2 text-primary" /> Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                </div>
                {error?.image && <div className="text-sm text-error mt-2">{error.image}</div>}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div></div>
              <div className="flex items-center gap-3">
                <button type="button" className="btn btn-ghost" onClick={clearAll}>
                  <FaTrashAlt /> Clear
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="loading loading-ring loading-sm"></div>
                      Creating...
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Create Group
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
