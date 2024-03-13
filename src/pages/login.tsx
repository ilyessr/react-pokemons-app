import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginSuccess } from "../redux/authDuck";

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>({
    username: { value: "" },
    password: { value: "" },
  });

  const [message, setMessage] = useState<string>(
    "Veuillez vous connecter"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const validateForm = () => {
    let newForm: Form = form;

    // Validator username
    if (form.username.value.length < 3) {
      const errorMsg: string =
        "Votre prénom doit faire au moins 3 caractères de long.";
      const newField: Field = {
        value: form.username.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField: Field = {
        value: form.username.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if (form.password.value.length < 3) {
      const errorMsg: string =
        "Votre mot de passe doit faire au moins 3 caractères de long.";
      const newField: Field = {
        value: form.password.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField: Field = {
        value: form.password.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        console.log(process.env.REACT_APP_API_BASE_URL)
        const response = await axios.post(

          `${process.env.REACT_APP_API_BASE_URL}/login`,
          {
            username: form.username.value,
            password: form.password.value,
          }
        );
        console.log({ response })
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        dispatch(loginSuccess(""));
        navigate("/pokemons");
      } catch (error) {
        setMessage("🔐 Identifiant ou mot de passe incorrect.");
        dispatch(loginFailure());
      }
    }
  };

  return (
    <div className="custom-container mx-auto px-4 mt-8">
      <div className="w-full mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-4 px-6 py-10">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1 className="text-2xl font-semibold">Connexion</h1>
              {/* Form message */}
              {message && (
                <div className="my-4 p-3 bg-grxay-100 text-sm text-gray-900">
                  {message}
                </div>
              )}
              {/* Field username */}
              <div className="my-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold"
                >
                  Identifiant
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="mt-1 p-2 w-full rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                  value={form.username.value}
                  onChange={handleInputChange}
                />
                {/* error */}
                {form.username.error && (
                  <div className="mt-1 text-sm text-red-500">
                    {form.username.error}
                  </div>
                )}
              </div>
              {/* Field password */}
              <div className="my-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="mt-1 p-2 w-full rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                  value={form.password.value}
                  onChange={handleInputChange}
                />
                {/* error */}
                {form.password.error && (
                  <div className="mt-1 text-sm text-red-500">
                    {form.password.error}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-bold p-3 rounded-md focus:outline-none focus:shadow-outline"
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
