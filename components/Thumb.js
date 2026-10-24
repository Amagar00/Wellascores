 import { optimize } from "@/lib/img";
import { gradientStyle, initials } from "@/lib/thumb";

// Photo credit strip along the bottom of the image (only when an image and a credit exist)
const creditStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  padding: "4px 10px",
  background: "rgba(0,0,0,.6)",
  color: "#fff",
  fontSize: "11px",
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

// The picture block used on cards:
// the uploaded image if there is one, otherwise a generated colour with initials.
export default function Thumb({ article, label, width = 640, className = "ps-th", eager = false }) {
  const src =
    typeof article.image === "string" && article.image ? optimize(article.image, width) : null;
  const credit =
    src && typeof article.imageCredit === "string" ? article.imageCredit.trim() : "";

  const style = src ? (credit ? { paddingBottom: 30 } : undefined) : gradientStyle(article.title);

  return (
    <div className={className} style={style}>
      {src ? (
        <img
          className="ps-img"
          src={src}
          alt={eager ? article.title : ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <span className="ps-ini" aria-hidden="true">
          {initials(article.title)}
        </span>
      )}
      {label ? <span className="ps-tag">{label}</span> : null}
      {credit ? <span style={creditStyle}>Photo: {credit}</span> : null}
    </div>
  );
}
