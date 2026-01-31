import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const endpoint = type === "signup" ? "signup" : "signin";
            const url = `${BACKEND_URL}/api/v1/user/${endpoint}`;
            console.log("Sending to:", url);
            console.log("Data:", postInputs);
            const response = await axios.post(url, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            console.error(e);
            const errorMsg = (e as any).response?.data?.message || "Error occurred";
            alert(errorMsg)
            // alert the user here that the request failed
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </h1>
                        <p className="text-gray-600">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                            <Link className="ml-2 text-blue-600 hover:underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        {type === "signup" ? (
                            <LabelledInput 
                                label="Name" 
                                placeholder="John Doe" 
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value
                                    })
                                }} 
                            />
                        ) : null}
                        <LabelledInput 
                            label="Username" 
                            placeholder="username@example.com" 
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    username: e.target.value
                                })
                            }} 
                        />
                        <LabelledInput 
                            label="Password" 
                            type={"password"} 
                            placeholder="Enter your password" 
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }} 
                        />
                        <button 
                            onClick={sendRequest} 
                            type="button" 
                            className="mt-6 w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
        <input 
            onChange={onChange} 
            type={type || "text"} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors" 
            placeholder={placeholder} 
            required 
        />
    </div>
}