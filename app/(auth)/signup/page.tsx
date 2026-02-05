import Image from "next/image";

const UserSingup = () => {
  return (
    <div className="flex flex-col justify-center items-center  mt-10">
      <div className="flex flex-col items-center w-100 gap-3">
        <button className="bg-white/3 hover:bg-white/5 h-15 w-full rounded-md border border-white/15 hover:border-white/20 flex justify-center items-center hover:text-lg hover:cursor-pointer gap-3">
          <Image
            src={`/google_logo.png`}
            height={20}
            width={20}
            alt="Google.logo"
          />
          <p>SignUp with Google</p>
        </button>
        <p className="text-white/50">or</p>
        <div className="flex flex-col justify-center items-center gap-4 bg-white/3 h-110 w-full rounded-md border border-white/15">
          {/* <p className="text-sm">Singup:</p> */}
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="First Name" type="text"/>
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="Last Name" type="text"/>
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="email@example.com" type="email"/>
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="Password" type="password"/>
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="Confirm Password" type="password"/>
          {/* <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" placeholder="Gender" type=""/> */}
          <select
            className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm text-white/30 bg-transparent placeholder:text-white/30"
            defaultValue=""
          >
            <option className="bg-[#1F1F1F]" value="" disabled>
              Gender
            </option>
            <option className="bg-[#2A2A2A]" value="male">Male</option>
            <option className="bg-[#2A2A2A]" value="female">Female</option>
            <option className="bg-[#2A2A2A]" value="nonbinary">Non-Binary</option>
            <option className="bg-[#2A2A2A]" value="preferNot">Prefer not to say</option>
          </select>
          <input className="h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30" type="date"/>
          <button className="h-8 border border-white/75 hover:border-white w-[80%] rounded-sm bg-[#FF7701] hover:bg-[#c95e00] font-semibold text-sm hover:text-[15px] hover:cursor-pointer">SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default UserSingup;


// import Image from "next/image";

// const UserSignup = () => {
//   return (
//     <div className="flex flex-col justify-center items-center mt-10">
//       <div className="flex flex-col items-center w-[100%] max-w-md gap-3">
//         {/* Google Signup Button */}
//         <button className="bg-white/10 hover:bg-white/20 h-12 w-full rounded-md border border-white/15 hover:border-white/20 flex justify-center items-center hover:text-lg cursor-pointer gap-3">
//           <Image
//             src={`/google_logo.png`}
//             height={20}
//             width={20}
//             alt="Google logo"
//           />
//           <p>Sign Up with Google</p>
//         </button>

//         <p className="text-white/50">or</p>

//         {/* Signup Form Container */}
//         <div className="flex flex-col justify-center items-center gap-4 bg-white/5 p-4 rounded-md border border-white/15 w-full">
          
//           {/* First Name */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="First Name"
//             type="text"
//           />

//           {/* Last Name */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="Last Name"
//             type="text"
//           />

//           {/* Email */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="email@example.com"
//             type="email"
//           />

//           {/* Password */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="Password"
//             type="password"
//           />

//           {/* Confirm Password */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="Confirm Password"
//             type="password"
//           />

//           {/* Gender Dropdown */}
//           <select
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm text-white bg-transparent placeholder:text-white/30"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Select Gender
//             </option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="nonbinary">Non-Binary</option>
//             <option value="preferNot">Prefer not to say</option>
//           </select>

//           {/* Date of Birth - Redesigned */}
//           <input
//             className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30 bg-transparent text-white"
//             placeholder="Date of Birth"
//             type="date"
//           />

//           {/* Sign Up Button */}
//           <button className="h-10 border border-white/75 hover:border-white w-[80%] rounded-sm bg-[#FF7701] hover:bg-[#c95e00] font-semibold text-sm hover:text-[15px] cursor-pointer">
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;
