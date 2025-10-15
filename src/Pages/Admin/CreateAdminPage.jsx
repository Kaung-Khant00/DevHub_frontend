import { useState, useRef, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiPhone, FiRefreshCw } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { isStrongPassword } from "../../Utility/Validator";
import { createAdmin, editAdminById, fetchAdminById } from "../../Redux/admin/admin.admins";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { PiTarget } from "react-icons/pi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Components/Common/Spinner";
import ReturnBackButton from "../../Components/Common/ReturnBackButton";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export default function CreateAdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    admin_specialty: "general_admin",
    permission_role: "ADMIN",
    address: "",
    age: "",
    gender: "",
  });
  const { id } = useParams();
  console.log(id ? "This is create page" : "This is edit page");
  const [officeImagePreview, setOfficeImagePreview] = useState(null);
  const detailLoading = useSelector((state) => state.admin.admins.detail.loading);
  const { loading, updatingLoading } = useSelector((state) => state.admin.admins.create);
  const detailData = useSelector((state) => state.admin.admins.detail.data);
  const error = useSelector((state) => state.admin.admins.create.error);
  const [fileSize, setFileSize] = useState(0);
  console.log(error);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  useEffect(() => {
    const setData = (data) => {
      setForm({
        name: data?.name || "",
        email: data?.email || "",
        password: data?.password || "",
        phone: data?.phone || "",
        admin_specialty: data?.admin_specialty || "general_admin",
        address: data?.admin_profile.address || "",
        permission_role: data?.permission_role || "ADMIN",
        age: data?.age || "",
        gender: data?.gender || "",
      });
      setOfficeImagePreview(data?.admin_profile?.office_image_url || null);
    };
    const fetchDetailData = async () => {
      const response = await dispatch(fetchAdminById(id)).unwrap();
      console.log(response);
      setData(response);
    };
    if (id && id != detailData?.id) {
      console.log("FETCHING THE ADMIN DETAIL");
      fetchDetailData();
    } else {
      setData(detailData);
    }
  }, []);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    console.log(file);
    setFileSize(file.size / 1024 / 1024); // in MB
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOfficeImagePreview(url);
    fileRef.current = file;
  }

  function generatePassword() {
    // I saw this function from online I didn't created this function myself but I modified with do while loop
    let pw = "";
    do {
      pw = "";
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*=?<>23456789!@#$%*=?<>";
      for (let i = 0; i < 12; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
    } while (!isStrongPassword(pw));
    setForm((prev) => ({ ...prev, password: pw }));
  }
  const resetData = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      admin_specialty: "general_admin",
      address: "",
      role: "ADMIN",
      age: "",
      gender: "",
    });
    setOfficeImagePreview(null);
    URL.revokeObjectURL(officeImagePreview);
    setFileSize(0);
    fileRef.current && (fileRef.current = null);
  };
  function handleRemoveImage() {
    setOfficeImagePreview(null);
    URL.revokeObjectURL(officeImagePreview);
    setFileSize(0);
    fileRef.current && (fileRef.current = null);
  }
  async function onSubmit(e) {
    e.preventDefault();
    console.log(fileRef.current);
    if (id) {
      try {
        await dispatch(editAdminById({ id, form, officeImage: fileRef.current ?? null })).unwrap();
        toast.success("Admin updated successfully");
      } catch {
        toast.error("Failed to update admin");
      }
    } else {
      try {
        await dispatch(createAdmin({ form, officeImage: fileRef.current ?? null })).unwrap();
        toast.success("Admin created successfully");
        navigate(-1);
        resetData();
      } catch {
        toast.error("Failed to create admin");
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-base-100 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <ReturnBackButton defaultBackTo="/admin/admins" />
            <div>
              <h1 className="text-2xl font-bold">{id ? "Edit" : "Create"} Admin Account</h1>
              {!id && <p className="text-sm text-muted">Create a new administrator. You can edit fields later.</p>}
            </div>
          </div>
          <div className="badge badge-outline">DevHub • Admin</div>
        </div>
        {id && detailLoading ? (
          <div className="h-96 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* left: form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="input">
                    <FiUser />
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
                  </label>
                  {error?.name && <div className="text-error text-sm">{error.name}</div>}
                </div>
                <div>
                  <label className="input">
                    <FiMail />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
                  </label>
                  {error?.email && <div className="text-error text-sm">{error.email}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="input">
                    <FiLock />
                    <input
                      name="password"
                      type="text"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password (auto generate)"
                    />
                    <button type="button" onClick={generatePassword} className=" ">
                      <FiRefreshCw />
                    </button>
                  </label>
                  {error?.password && <div className="text-error text-sm">{error.password}</div>}
                  <div>
                    <div className="text-sm text-muted ">
                      Password strength:{" "}
                      <strong>
                        {form?.password.length > 0
                          ? isStrongPassword(form.password)
                            ? "Strong"
                            : "Weak"
                          : "No Password Yet"}
                      </strong>
                    </div>
                    <div className="mt-1 text-xs text-muted">We recommend generating a secure password.</div>
                  </div>
                </div>
                <div>
                  <label className="input">
                    <FiPhone />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                  </label>
                  {error?.phone && <div className="text-error text-sm">{error.phone}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={"self-end"}>
                  <label className="input">
                    <LiaBirthdayCakeSolid size={20} />
                    <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
                  </label>
                  {error?.name && <div className="text-error text-sm">{error.age}</div>}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text flex items-center gap-2">Gender</span>
                  </label>
                  <select
                    className="select select-bordered select-primary w-full"
                    name="gender"
                    onChange={handleChange}>
                    <option disabled selected>
                      Choose the gender
                    </option>
                    <option value="male" className="text-blue-500">
                      Male
                    </option>
                    <option value="female" className="text-pink-500">
                      Female
                    </option>
                  </select>
                  {error?.gender && <div className="text-error text-sm">{error.gender}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <PiTarget className="text-lg" /> Admin Specialty(optional)
                    </span>
                  </label>
                  <select
                    defaultValue="general_admin"
                    className="select"
                    name="admin_specialty"
                    onChange={handleChange}>
                    <option value="general_admin" selected>
                      General Admin
                    </option>
                    <option value="post_manager">Post Manager</option>
                    <option value="report_manager">Report Manager</option>
                    <option value="group_manager">Group Manager</option>
                    <option value="user_manager">User Manager</option>
                    <option value="support_manager">Support Manager</option>
                  </select>
                  {error?.admin_specialty && <div className="text-error text-sm">{error.admin_specialty}</div>}
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <RiShieldKeyholeLine className="text-lg" /> Permissions role
                    </span>
                  </label>
                  <select className="select select-bordered select-primary w-full" name="role" onChange={handleChange}>
                    <option value="ADMIN">Admin (Full access)</option>
                    <option value="MODERATOR">Moderator</option>
                  </select>
                  {error?.role && <div className="text-error text-sm">{error.role}</div>}
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label className="label">
                    <HiOutlineLocationMarker className="inline" size={20} /> Address
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address">
                    {form.address}
                  </textarea>
                  {error?.address && <div className="text-error text-sm">{error.address}</div>}
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <button type="submit" className={`btn btn-primary`}>
                    {loading || updatingLoading ? <Spinner /> : <BiUserPlus className="inline" size={22} />}{" "}
                    {id ? "Update" : "Create"} admin
                  </button>

                  <button type="button" onClick={resetData} className="btn btn-ghost">
                    Reset
                  </button>

                  <div className="ml-auto text-sm text-muted">Some fields can be updated later from admin profile.</div>
                </div>
              </div>
            </div>

            {/* right: preview & avatar */}
            <aside className="space-y-6">
              <div className="p-4 border border-base-200 rounded">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full bg-base-200 overflow-hidden">
                      {officeImagePreview ? (
                        <img src={officeImagePreview} alt="avatar preview" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl text-muted">
                          {form.name ? form.name.charAt(0).toUpperCase() : <FiUser />}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{form.name || "Full name"}</div>
                    <div className="text-sm text-muted">{form.role}</div>
                  </div>
                </div>
                {fileSize !== 0 && (
                  <div className="text-sm mt-1">
                    File size: <strong>{fileSize.toFixed(2)}MB</strong> / 2.00MB max
                  </div>
                )}
                {error?.officeImage && <div className="text-error text-sm">{error.officeImage}</div>}
                {officeImagePreview && (
                  <button onClick={handleRemoveImage} className="btn">
                    Remove image
                  </button>
                )}
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Upload avatar</span>
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={handleFile}
                    className="file-input file-input-bordered w-full"
                  />
                  <div className="text-xs text-muted mt-2">PNG,JPG,JPEG,WEBP only (2MB max)</div>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
