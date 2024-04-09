import lockersLogo from "./assets/lockers.png";

export default function BrandLogo() {
  return (
    <div className="brand_logo">
      <img
        id="logo-image"
        src={lockersLogo}
        style={{ width: 64, margin: 10 }}
        alt="icon of two lockers"
      />
      <h1>The Dad Locker</h1>
    </div>
  );
}
