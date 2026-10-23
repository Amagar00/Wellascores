import { optimize } from "@/lib/img";
import { gradientStyle, initials } from "@/lib/thumb";

// The picture block used on cards and at the top of an article:
// the uploaded image if there is one, otherwise a generated colour with initials.
export default function Thumb({ article, label, width = 640, className = "ps-th", eager = false }) {
  const src =
    typeof article.image === "string" && article.image ? optimize(article.image, width) : null;

  return (
    <div className={className} style={src ? undefined : gradientStyle(article.title)}>
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
    </div>
  );
}
