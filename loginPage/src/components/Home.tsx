import { useState } from "react";
import {EyeIcon,EyeSlashIcon} from "@heroicons/react/24/solid";
const Home = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  const passwordType = showPassword ? "text" : "password";
  return (
    <div>
      <p>Success Login</p>
      <label htmlFor="password">Password:</label>
      <input
        type={passwordType}
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={toggleShowPassword}>
        {showPassword ? "Hide" : "Show"} Password
      </button>
      <EyeIcon className="w-5 text-gray-500"/>
      <EyeSlashIcon className="w-5 text-gray-500"/>


    </div>
  );
};

export default Home;
