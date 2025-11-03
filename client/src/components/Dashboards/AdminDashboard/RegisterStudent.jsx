// import { useState } from "react";
// import { Input } from "./Input";
// import { Button } from "../Common/PrimaryButton";
// import { Loader } from "../Common/Loader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function RegisterStudent() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const registerStudent = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       let student = {
//         name: name,
//         urn: urn,
//         room_no: room_no,
//         batch: batch,
//         dept: dept,
//         course: course,
//         email: email,
//         father_name: fatherName,
//         contact: contact,
//         address: address,
//         dob: dob,
//         uidai: uidai,
//         hostel: hostel,
//         password: password
//       };
//       console.log(student);
//       const res = await fetch(`${mainUri}/api/student/register-student`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(student),
//       })
//       const data = await res.json();
//       if (data.success) {
//         toast.success(
//           'Student ' + data.student.name + ' Registered Successfully!', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         })
//         seturn("");
//         setName("");
//         setRoomNo("");
//         setBatch("");
//         setDept("");
//         setCourse("");
//         setEmail("");
//         setFatherName("");
//         setContact("");
//         setAddress("");
//         setDob("");
//         setuidai("");
//         setPassword("");
//         setLoading(false);
//       } else {
//         data.errors.forEach((err) => {
//           toast.error(
//             err.msg, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//           })
//         })
//         setLoading(false);
//       }
//     } catch (err) {
//       toast.error(
//         err, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       }
//       )
//       setLoading(false);
//     }
//   };

//   const hostel = "Hostel No 1";
//   const [urn, seturn] = useState();
//   const [name, setName] = useState();
//   const [room_no, setRoomNo] = useState();
//   const [batch, setBatch] = useState();
//   const [dept, setDept] = useState();
//   const [course, setCourse] = useState();
//   const [email, setEmail] = useState();
//   const [fatherName, setFatherName] = useState();
//   const [contact, setContact] = useState();
//   const [address, setAddress] = useState();
//   const [dob, setDob] = useState();
//   const [uidai, setuidai] = useState();
//   const [password, setPassword] = useState();

//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="w-full min-h-screen bg-white text-black pt-36 flex flex-col items-center justify-center">
//       <h1 className="font-extrabold text-4xl md:text-5xl text-center text-[#4f46e5] mb-8">Register Student</h1>
//       <div className="max-w-4xl w-full p-10 bg-white rounded-2xl shadow-xl drop-shadow-2xl shadow-black/10 mb-12"> 
//         <form method="post" onSubmit={registerStudent} className="flex flex-col gap-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Input
//               field={{
//                 name: "name",
//                 placeholder: "Student Name",
//                 type: "text",
//                 req: true,
//                 value: name,
//                 onChange: (e) => setName(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "urn",
//                 placeholder: "Student urn",
//                 type: "number",
//                 req: true,
//                 value: urn,
//                 onChange: (e) => seturn(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "dob",
//                 placeholder: "Student dob",
//                 type: "date",
//                 req: true,
//                 value: dob,
//                 onChange: (e) => setDob(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "uidai",
//                 placeholder: "Student uidai",
//                 type: "text",
//                 req: true,
//                 value: uidai,
//                 onChange: (e) => setuidai(e.target.value),
//               }}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Input
//               field={{
//                 name: "email",
//                 placeholder: "Student Email",
//                 type: "email",
//                 req: true,
//                 value: email,
//                 onChange: (e) => setEmail(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "contact",
//                 placeholder: "Student Contact",
//                 type: "text",
//                 req: true,
//                 value: contact,
//                 onChange: (e) => setContact(e.target.value),
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="address" className="block mb-2 text-sm font-medium text-[#4f46e5]">Address</label>
//             <textarea
//               name="address"
//               placeholder="Student Address"
//               required
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-3 bg-gray-200 border rounded-md border-neutral-300 text-black focus:ring-2 focus:ring-[#4f46e5] outline-none"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <Input
//               field={{
//                 name: "father_name",
//                 placeholder: "Student's Father Name",
//                 type: "text",
//                 req: true,
//                 value: fatherName,
//                 onChange: (e) => setFatherName(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "room",
//                 placeholder: "Student Room",
//                 type: "number",
//                 req: true,
//                 value: room_no,
//                 onChange: (e) => setRoomNo(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "hostel",
//                 placeholder: "Student Hostel",
//                 type: "text",
//                 req: true,
//                 value: hostel,
//                 disabled: true,
//               }}
//             />
//             <Input
//               field={{
//                 name: "dept",
//                 placeholder: "Student Department",
//                 type: "text",
//                 req: true,
//                 value: dept,
//                 onChange: (e) => setDept(e.target.value),
//               }}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Input
//               field={{
//                 name: "course",
//                 placeholder: "Student Course",
//                 type: "text",
//                 req: true,
//                 value: course,
//                 onChange: (e) => setCourse(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "batch",
//                 placeholder: "Student Batch",
//                 type: "number",
//                 req: true,
//                 value: batch,
//                 onChange: (e) => setBatch(e.target.value),
//               }}
//             />
//           </div>

//           <div>
//             <Input
//               field={{
//                 name: "password",
//                 placeholder: "Student Password",
//                 type: "password",
//                 req: true,
//                 value: password,
//                 onChange: (e) => setPassword(e.target.value),
//               }}
//             />
//           </div>

//           <div className="mt-6">
//             <Button>
//               {loading ? (
//                 <>
//                   <Loader /> Registering...
//                 </>
//               ) : (
//                 <span>Register Student</span>
//               )}
//             </Button>

//             <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="dark"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterStudent;

import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterStudent() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const storedAdmin = JSON.parse(localStorage.getItem("admin"));
  const hostel = storedAdmin?.hostel?.name || "Hostel No 1";

  const [urn, seturn] = useState("");
  const [name, setName] = useState("");
  const [room_no, setRoomNo] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [uidai, setuidai] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const registerStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const student = {
        name,
        urn,
        room_no,
        batch,
        dept,
        course,
        email,
        father_name: fatherName,
        contact,
        address,
        dob,
        uidai,
        hostel,
        password,
        accountNumber,
      };

      const res = await fetch(`${mainUri}/api/student/register-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Student ${data.student.name} Registered Successfully!`);
        // Reset all fields
        seturn(""); setName(""); setRoomNo(""); setBatch(""); setDept(""); setCourse("");
        setEmail(""); setFatherName(""); setContact(""); setAddress(""); setDob("");
        setuidai(""); setPassword(""); setAccountNumber("");
      } else {
        data.errors.forEach(err =>
          toast.error(err.msg || "Registration failed.")
        );
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-8 lg:pl-64 pt-36 flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-4xl md:text-5xl text-center text-[#4f46e5] mb-8">
        Register Student
      </h1>

      <div className="max-w-4xl w-full p-6 sm:p-10 bg-white rounded-2xl shadow-xl mb-12">
        <form onSubmit={registerStudent} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input field={{
              name: "name",
              placeholder: "Student Name",
              type: "text",
              req: true,
              value: name,
              onChange: (e) => setName(e.target.value),
            }} />
            <Input field={{
              name: "urn",
              placeholder: "Student URN",
              type: "number",
              req: true,
              value: urn,
              onChange: (e) => seturn(e.target.value),
            }} />
            <Input field={{
              name: "dob",
              placeholder: "Date of Birth",
              type: "date",
              req: true,
              value: dob,
              onChange: (e) => setDob(e.target.value),
            }} />
            <Input field={{
              name: "uidai",
              placeholder: "UIDAI Number",
              type: "text",
              req: true,
              value: uidai,
              onChange: (e) => setuidai(e.target.value),
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input field={{
              name: "email",
              placeholder: "Email Address",
              type: "email",
              req: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
            }} />
            <Input field={{
              name: "contact",
              placeholder: "Contact Number",
              type: "text",
              req: true,
              value: contact,
              onChange: (e) => setContact(e.target.value),
            }} />
          </div>

          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-[#4f46e5]">Address</label>
            <textarea
              name="address"
              placeholder="Residential Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 bg-gray-200 border rounded-md border-neutral-300 text-black focus:ring-2 focus:ring-[#4f46e5] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input field={{
              name: "father_name",
              placeholder: "Father's Name",
              type: "text",
              req: true,
              value: fatherName,
              onChange: (e) => setFatherName(e.target.value),
            }} />
            <Input field={{
              name: "room_no",
              placeholder: "Room Number",
              type: "number",
              req: true,
              value: room_no,
              onChange: (e) => setRoomNo(e.target.value),
            }} />
            <Input field={{
              name: "hostel",
              placeholder: "Hostel",
              type: "text",
              req: true,
              value: hostel,
              disabled: true,
            }} />
            <Input field={{
              name: "dept",
              placeholder: "Department",
              type: "text",
              req: true,
              value: dept,
              onChange: (e) => setDept(e.target.value),
            }} />
            {/* ................................... */}
            <Input field={{
              name: "accountNumber",
              placeholder: "account number",
              type: "text",
              req: true,
              value: accountNumber,
              onChange: (e) => setAccountNumber(e.target.value),
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input field={{
              name: "course",
              placeholder: "Course",
              type: "text",
              req: true,
              value: course,
              onChange: (e) => setCourse(e.target.value),
            }} />
            <Input field={{
              name: "batch",
              placeholder: "Batch",
              type: "number",
              req: true,
              value: batch,
              onChange: (e) => setBatch(e.target.value),
            }} />
          </div>

          <div>
            <Input field={{
              name: "password",
              placeholder: "Password",
              type: "password",
              req: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }} />
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? <><Loader /> Registering...</> : "Register Student"}
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RegisterStudent;
