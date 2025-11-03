import { useState } from "react";

// Input component included inline for the demo
const Input = ({ field }) => {
  return (
    <div className="mb-2">
      <label 
        htmlFor={field.name} 
        className="block mb-2 text-sm font-bold text-black "
      >
        {field.name}
      </label>
      <input
        type={field.type}
        id={field.name}
        placeholder={field.placeholder}
        required={field.req}
        onChange={field.onChange}
        value={field.value}
        className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-black focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default function Settings() {
  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState('');
  
  const navigate = () => {
    // Mock navigation function
    console.log("Navigating to /admin-dashboard");
  };

  const changePassword = async (e) => {
    e.preventDefault();
    
    // Mock API call
    alert("Password Changed Successfully");
    navigate("/admin-dashboard");
  };

  function chngPass(e) {
    setPass(e.target.value);
  }

  function chngOldPass(e) {
    setOldPass(e.target.value);
  }

  const chngPassField = {
    name: "New Password",
    type: "password",
    placeholder: "New Password",
    req: true,
    onChange: chngPass,
    value: pass,
  };
  
  const chngOldPassField = {
    name: "Old Password",
    type: "password",
    placeholder: "Old Password",
    req: true,
    onChange: chngOldPass,
    value: oldPass,
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#f3e8ff" }}>
      <h1 className="font-bold text-4xl mb-8 text-center text-indigo-600" style={{ color: "#4f46e5" }}>Settings</h1>
      
      <form method="POST" onSubmit={changePassword} className="w-full max-w-md">
        <div className="flex flex-col justify-between gap-4 bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600" style={{ color: "#4f46e5" }}>
            Change Password
          </h2>
          
          <Input field={chngOldPassField} />
          <Input field={chngPassField} />
          
          <button
            type="submit"
            className="hover:scale-95 transition-all duration-200 w-full text-white font-medium rounded-lg text-sm px-5 py-3 mt-2 text-center focus:ring-4 focus:outline-none focus:ring-indigo-300"
            style={{ backgroundColor: "#4f46e5" }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}