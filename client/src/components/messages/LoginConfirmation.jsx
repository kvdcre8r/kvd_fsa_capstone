import { useNavigate } from "react-router-dom";

export default function LoginConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="user_message">
      <h3>You are successfully logged in!</h3>
      <button onClick={() => navigate("/")}>Shop Now</button>
      <button onClick={() => navigate("/cart")}>View My Cart</button>
      <div className="spacer"></div>
    </div>
  );
}
