import {
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const ProfileAbout = ({ profile, skills, user }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
        <div className="card-body p-4 md:p-6">
          <h2 className="card-title text-lg">About</h2>
          <div className="mt-3 space-y-3">
            <InfoRow Icon={FaEnvelope}>{user?.email || "—"}</InfoRow>
            {user?.phone && <InfoRow Icon={FaPhone}>{user.phone}</InfoRow>}
            {profile?.address && (
              <InfoRow Icon={FaMapMarkerAlt}>{profile.address}</InfoRow>
            )}
          </div>

          <div className="divider my-4" />
          <h3 className="font-medium">Skills</h3>
          {skills?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <div key={i} className="badge badge-outline">
                  {s}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-70 mt-2">No skills added yet.</p>
          )}

          <div className="divider my-4" />
          <h3 className="font-medium">Links</h3>
          <div className="mt-2 flex flex-col gap-2">
            {!profile?.github_url && !profile?.linkedin_url && (
              <div className="text-sm opacity-70 mt-2">
                No Links Provided Yet
              </div>
            )}
            <ExternalLink href={profile?.github_url} icon={FaGithub}>
              GitHub
            </ExternalLink>
            <ExternalLink href={profile?.linkedin_url} icon={FaLinkedin}>
              LinkedIn
            </ExternalLink>
            <ExternalLink href={profile?.portfolio_url} icon={FaGlobe}>
              Portfolio
            </ExternalLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

function ExternalLink({ href, children, icon: Icon }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sm btn-ghost normal-case gap-2"
    >
      {Icon ? <Icon size={18} /> : <FaLink size={18} />}
      <span className=" max-w-[160px]">{children}</span>
    </a>
  );
}
function InfoRow({ Icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 opacity-70">
        <Icon size={18} />
      </div>
      <div className="text-sm leading-relaxed break-words">{children}</div>
    </div>
  );
}

export default ProfileAbout;
