import { useState, useRef, useEffect } from "react";
import { FiImage, FiX, FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, fetchQuestionDetail, updateQuestion } from "../../../Redux/question/questionSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";
import { FaTimes } from "react-icons/fa";
import Spinner from "../../../Components/Common/Spinner";
import CreateQuestionSkeleton from "../../SkeletonLoading/CreateQuestionSkeleton";

// CreateQuestion.jsx
// Requirements: TailwindCSS + DaisyUI + react-icons
// Drop into your React app. Expects an authenticated user (token) to POST to /api/questions

export default function CreateQuestion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    body: "",
    code_snippet: "",
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const imageRef = useRef(null);
  const errors = useSelector((state) => state.question.create.errors || {});
  const loading = useSelector((state) => state.question.create.loading || false);
  const editDataLoadingRef = useRef(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailQuestion = useSelector((state) => state.question.detail.data);
  // Basic client-side constraints
  const MAX_TITLE = 255;
  const MAX_BODY = 5000;
  const MAX_CODE_SNIPPET = 5000;
  const MAX_IMAGE_MB = 3; // limit upload size

  useEffect(() => {
    if (id) {
      const fetchQuestionDetailApi = async () => {
        editDataLoadingRef.current = true;
        const response = await dispatch(fetchQuestionDetail({ id })).unwrap();
        console.log("response", {
          title: response.question.title ?? "",
          body: response.question.body ?? "",
          code_snippet: response.question.code_snippet ?? "",
        });
        setForm({
          title: response.question.title ?? "",
          body: response.question.body ?? "",
          code_snippet: response.question.code_snippet ?? "",
        });
        setTags(response.question.tags || []);
        setIsAnonymous(response.question.is_anonymous);
        setImagePreview(response.question.image_url);
        editDataLoadingRef.current = false;
      };
      if (detailQuestion?.id === id) {
        setForm({
          title: detailQuestion.title,
          body: detailQuestion.body,
          code_snippet: detailQuestion.code_snippet,
        });
        setTags(detailQuestion.tags || []);
        setIsAnonymous(detailQuestion.is_anonymous);
        setImagePreview(detailQuestion.image_url);
      } else {
        fetchQuestionDetailApi();
      }
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(
          updateQuestion({
            data: {
              ...form,
              isRemoveImage,
              image: imageRef.current,
              tags,
              is_anonymous: isAnonymous ? 1 : 0,
            },
            id,
          })
        ).unwrap();
        toast.success("Question updated successfully!");
      } else {
        await dispatch(
          createQuestion({ ...form, image: imageRef.current, tags, is_anonymous: isAnonymous ? 1 : 0 })
        ).unwrap();
        toast.success("Question created successfully!");
      }
      navigate("/question");
    } catch {
      const message = id ? "Failed to update question" : "Failed to create question";
      toast.error(message);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  function onFile(e) {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    imageRef.current = f;
    setImagePreview(URL.createObjectURL(f));
  }

  function removeImage() {
    setImagePreview(null);
    setIsRemoveImage(true);
    if (imageRef.current) imageRef.current = null;
  }
  if (editDataLoadingRef.current) {
    return <CreateQuestionSkeleton />;
  }
  return (
    <div className="w-full m-5 bg-base-100 p-5 rounded">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <ReturnBackButton defaultBackTo={`${id ? `/question/${id}` : "/question"}`} />
          <h2 className="text-lg font-semibold">{id ? "Update the" : "Ask a"} question — DevHub</h2>
        </div>
        <div className="flex flex-col justify-end">
          <label className="cursor-pointer label">
            <span className="label-text">Post anonymously</span>
            <input
              checked={isAnonymous}
              onChange={() => {
                setIsAnonymous((pre) => !pre);
              }}
              type="checkbox"
              className="toggle toggle-primary "
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="label">
            <span className="label-text">
              Title <span className="text-red-500">*</span>
            </span>
            <span className="label-text-alt">
              {form.title.length}/{MAX_TITLE}
            </span>
          </label>
          <input
            value={form.title}
            onChange={handleChange}
            name="title"
            className="input input-bordered w-full"
            maxLength={MAX_TITLE}
            placeholder="What you want to ask ?"
          />
          {errors.title && <p className="text-xs text-error mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="label">
            <span className="label-text">
              Body <span className="text-red-500">*</span>
            </span>
            <span className="label-text-alt">
              {form.body.length}/{MAX_BODY}
            </span>
          </label>
          <textarea
            value={form.body}
            onChange={handleChange}
            rows={6}
            name="body"
            className="textarea textarea-bordered w-full"
            placeholder="About the detail of your question "
          />
          {errors.body && <p className="text-xs text-error mt-1">{errors.body}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">
                Code snippet (optional) <span className="text-red-500">*</span>
                <span className="label-text-alt">
                  {form.code_snippet.length}/{MAX_CODE_SNIPPET}
                </span>
              </span>
            </label>
            <textarea
              value={form.code_snippet}
              onChange={handleChange}
              rows={6}
              name="code_snippet"
              className="textarea textarea-bordered w-full font-mono text-sm"
              placeholder={`Minimal code snippet for better understanding.`}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Image (optional)</span>
            </label>
            <div className="border border-dashed rounded-md p-2 flex flex-col items-center justify-center gap-2">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="preview" className="h-32 object-contain" />
                </div>
              ) : (
                <div className="flex items-center justify-center text-sm opacity-80">
                  <FiImage size={28} />
                  <p className="text-xs">PNG / JPG / WEBP / JPG — max {MAX_IMAGE_MB}MB</p>
                </div>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                onChange={onFile}
                className="hidden"
                id="q-image-input"
              />
              <div className="flex gap-2">
                <label htmlFor="q-image-input" className="btn btn-sm">
                  Upload image
                </label>
                {imagePreview && (
                  <button type="button" className="btn btn-sm" onClick={removeImage}>
                    Remove
                  </button>
                )}
              </div>

              {errors.image && <p className="text-xs text-error mt-1">{errors.image}</p>}
            </div>
            <div className="mt-2">
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
                placeholder="HashTags ; max 3 (optional)"
                className="input input-bordered w-full"
              />
              {errors.tags && <p className="text-xs text-error my-2">{errors.tags}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {tags &&
                  tags.map((t, i) => (
                    <div key={i} className="badge badge-outline py-2 px-2 flex items-center gap-2">
                      <span className="text-sm">{t}</span>
                      <button type="button" onClick={() => removeTag(i)} className="btn btn-ghost btn-xs">
                        <FaTimes />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 md:mr-30">
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", body: "", code_snippet: "" });
              removeImage();
            }}
            className="btn btn-ghost">
            Reset
          </button>
          <button disabled={loading} type="submit" className={`btn btn-primary flex items-center gap-2`}>
            {loading ? <Spinner /> : <FiSend />} Post Question
          </button>
        </div>
      </form>
    </div>
  );
}
