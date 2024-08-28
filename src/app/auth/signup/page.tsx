"use client";
import { Roboto_Slab } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from './signup.module.css'
const robotoSlab = Roboto_Slab({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formUrl = e.target.action;

    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Error:", errorData);
            alert(`Error: ${errorData.message}`);
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(`Success: ${data.message}`);
        setFormData({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        router.push("/api/auth/signin");
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      });
  };

  return (
    <div
      className={`${robotoSlab.className}`}
    >
      <h1 className={style.title}>Sign Up</h1>

        <form className={style.formSection} method="POST" action={`/api/user`} onSubmit={submitForm}>
          <div className={style.formComponent} >
            <label className={style.formLabel}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              className={style.formInput}
            />
          </div>
          <div className={style.formComponent}>
            <label className={style.formLabel}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              className={style.formInput}
            />
          </div>
          <div className={style.formComponent}>
            <label className={style.formLabel}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              className={style.formInput}
            />
          </div>
          <div className={style.formComponent}>
            <label className={style.formLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInput}
              className={style.formInput}
            />
          </div>
          <button
            type="submit"
            className={style.confirmButton}
          >
            Submit
          </button>
        </form>
    </div>
  );
}
