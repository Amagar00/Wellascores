 import AdBanner from "./AdBanner";

const AD_UNITS = {
  top: { key: process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY, width: 728, height: 90 },
  bottom: { key: process.env.NEXT_PUBLIC_ADSTERRA_BOTTOM_KEY, width: 728, height: 90 },
  "in-article": { key: process.env.NEXT_PUBLIC_ADSTERRA_INARTICLE_KEY, width: 300, height: 250 },
};

export default function AdSlot({ variant = "banner" }) {
  const positionClass =
    variant === "top" ? "top" : variant === "bottom" ? "bottom" : "";
  const unit = AD_UNITS[variant];

  if (!unit?.key) {
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

  return (
    <div className={`ad-slot ${variant === "in-article" ? "in-article" : positionClass}`}>
      <AdBanner dataKey={unit.key} width={unit.width} height={unit.height} />
    </div>
  );
    }
