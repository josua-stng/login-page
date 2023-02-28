import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
interface User {
  id: number;
  username: string;
  password: string;
}

function LoginPage() {
  const [user, setUser] = useState<User[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const toogleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const passwordType = showPassword ? "text" : "password";

  const navigate = useNavigate();

  const getUserLogin = async () => {
    const userData = await axios("http://localhost:3001/users");
    const responseUserData = await userData.data;
    setUser(responseUserData);
  };

  const handleUserLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getUser = user;
    let userFound = false;
    getUser.forEach((users) => {
      if (users.username === username && users.password === password) {
        navigate("/home");
        userFound = true;
        return null;
      } else if (users.username === username && users.password !== password) {
        alert("Wrong Password");
        userFound = true;
        return null;
      }
    });
    if (!userFound) {
      alert("Wrong Username or Password");
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-neutral-200 ">
      <div>
        <form
          action=""
          onSubmit={handleUserLogin}
          className="flex flex-col justify-center items-center  bg-slate-50 h-[450px] w-[330px] mx-auto rounded-xl"
        >
          <h1 className="text-2xl mb-10 font-bold mt-5">Welcome</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border-b-2 border-black pl-1 mr-[18px] h-10 "
          />
          <div className="">
            <input
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-b-2 border-black pl-1 h-10 mt-10"
            />
            <button type="button" onClick={toogleShowPassword}>
              {showPassword ? (
                <EyeSlashIcon className="w-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 text-gray-500" />
              )}
            </button>
          </div>
          <button className="p-2 w-[251px] rounded-xl mt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white mb-16 hover:text-slate-800" >
            Login
          </button>
          <div className="flex mb-10">
            <p className="pr-2 ">Don't have an account?</p>
            <Link to="/register" className=" text-sky-600 hover:text-slate-400">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
