function CardShell({ title, action, children }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-base font-bold">{title}</h3>
          {action}
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
export default CardShell;
