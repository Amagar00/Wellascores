 import AdBanner from "./AdBanner";

// A 300x250 box pushes content down a lot on a phone, so by default the TOP slot is hidden on phones.
// Set to true to show it on every page, or pass showOnMobile to a single <AdSlot variant="top" />.
const SHOW_TOP_AD_ON_MOBILE = false;

const wide = (key) => ({ key, width: 728, height: 90 });
const box = (key) => ({ key, width: 300, height: 250 });

export default function AdSlot({ variant = "banner", showOnMobile = SHOW_TOP_AD_ON_MOBILE }) {
  const topKey = process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY;
  const bottomKey = process.env.NEXT_PUBLIC_ADSTERRA_BOTTOM_KEY;
  const boxKey = process.env.NEXT_PUBLIC_ADSTERRA_INARTICLE_KEY;

  let desktop;
  let mobile;
  let cls = "ps-ad";

  if (variant === "top") {
    desktop = wide(topKey);
    mobile = showOnMobile ? box(boxKey) : null;
    cls += showOnMobile ? " ps-ad-top" : " ps-ad-top ps-ad-nomobile";
  } else if (variant === "in-article") {
    desktop = box(boxKey);
    mobile = box(boxKey);
    cls += " ps-ad-in";
  } else {
    desktop = wide(bottomKey);
    mobile = box(boxKey);
    cls += " ps-ad-bottom";
  }

  const hasKeys = (desktop && desktop.key) || (mobile && mobile.key);

  if (!hasKeys) {
    return (
      <div className="ps-ad">
        <div className="ps-ad-ph">Ad space — {variant}</div>
      </div>
    );
  }

  return (
    <div className={cls}>
      <AdBanner desktop={desktop} mobile={mobile} />
    </div>
  );
}
