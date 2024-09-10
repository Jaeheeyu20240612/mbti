// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const LoginForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     id: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form
//       className="flex flex-col items-center gap-4 bg-green mt-auto mb-auto max-h-[80vh] overflow-y-auto p-4"
//       onSubmit={handleSubmit}
//     >
//       <input
//         className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 p-4 h-10 text-center border-2"
//         type="text"
//         name="id"
//         value={formData.id}
//         onChange={handleChange}
//         placeholder="아이디"
//         required
//       />
//       <input
//         className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 p-4 h-10 text-center border-2"
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="비밀번호"
//         required
//       />
//       <div className="flex flex-row gap-4">
//         <button type="submit">로그인</button>
//         <Link to="/signup">회원가입</Link>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
