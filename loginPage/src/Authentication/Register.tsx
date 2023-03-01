import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

interface User {
  id: number;
  username: string;
  password: string;
}
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setDataUser] = useState<User[]>([]);
  const [hidePassword, setHidePassword] = useState(false);
  const navigate = useNavigate();

  const getUserAccount = async () => {
    const userData = await fetch("http://localhost:3001/users");
    const responseUserData = await userData.json();
    setDataUser(responseUserData);
  };

  const handlerHidePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setHidePassword((prevState) => !prevState);
  };  

  const passwordType = hidePassword ? "text" : "password";

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userExist = dataUser.some(
        (user) => user.username === username || user.password === password
      );

      if (userExist) {
        if (username.trim() && password.trim()) {
          alert("Username or password already exist");
        }
      } else if (!password.trim() && !username.trim()) {
        alert("Username & password cant empty");
        return;
      } else if (!password.trim()) {
        alert("password cant empty");
        return;
      } else if (!username.trim()) {
        alert("Username cant empty");
        return;
      } else {
        const body = {
          username,
          password,
        };
        const response = await fetch("http://localhost:3001/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Register Successfully",
          });
          navigate("/");
        } else {
          console.error(Error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-neutral-200 ">
      <div>
        <form
          action=""
          onSubmit={addUser}
          className="flex flex-col justify-center items-center  bg-slate-50 h-[450px] w-[330px] mx-auto rounded-xl"
        >
          <h1 className="text-2xl mb-10 font-bold mt-5">Register</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border-b-2 border-black pl-1 h-10 mr-[18px]"
          />
          <div>
            <input
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-b-2 border-black pl-1 h-10 mt-10"
            />
            <button type="button" onClick={handlerHidePassword}>
              {hidePassword ? (
                <EyeSlashIcon className="w-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 text-gray-500" />
              )}
            </button>
          </div>
          <button className="p-2 w-[251px] rounded-xl mt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white mb-16 hover:text-slate-800">
            Login
          </button>
          <div className="flex mb-10">
            <p className="pr-2 ">Already have an account?</p>
            <Link to="/" className="text-sky-600 hover:text-sky-400">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
