export default function AdSlot({ variant = "banner" }) {
  const positionClass =
    variant === "top" ? "top" : variant === "bottom" ? "bottom" : "";
  const label =
    variant === "top"
      ? "banner — top"
      : variant === "bottom"
      ? "banner — bottom"
      : variant === "in-article"
      ? "in-article"
      : "banner";

  return (
    <div className={`ad-slot ${variant === "in-article" ? "in-article" : positionClass}`}>
      <div className="ad-inner">Ad space — {label}</div>
    </div>
  );
}
