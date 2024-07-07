'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef();
  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleOpenFileUploader = () => {
    inputFileRef.current.click();
  }

  const handleUploadProfilePic = (e) => {
    const file = e.target.files[0];
    setData(prev => ({
      ...prev,
      profile_pic: file
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("location", data.location);
    formData.append("occupation", data.occupation);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profile_pic) {
      formData.append("profile_pic", data.profile_pic);
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/register', formData);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          firstName: "",
          lastName: "",
          location: "",
          occupation: "",
          email: "",
          password: "",
          profile_pic: null,
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='container w-full mx-auto p-4 mt-5'>
      <div className='w-full max-w-md bg-white shadow border p-4 mx-auto'>

        <form className='grid gap-4' onSubmit={handleSubmit}>

          <div className='grid lg:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='firstName'>First Name:</label>
              <input
                type='text'
                name="firstName"
                id='firstName'
                value={data.firstName}
                placeholder='Enter first name'
                onChange={handleOnChange}
                disabled={loading}
                className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='lastName'>Last Name:</label>
              <input
                type='text'
                name="lastName"
                id='lastName'
                value={data.lastName}
                placeholder='Enter last name'
                onChange={handleOnChange}
                disabled={loading}
                className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
              />
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              name="location"
              id='location'
              value={data.location}
              placeholder='Enter location'
              onChange={handleOnChange}
              disabled={loading}
              className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='occupation'>Occupation:</label>
            <input
              type='text'
              name="occupation"
              id='occupation'
              value={data.occupation}
              placeholder='Enter occupation'
              onChange={handleOnChange}
              disabled={loading}
              className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name="email"
              id='email'
              value={data.email}
              placeholder='Enter email'
              onChange={handleOnChange}
              disabled={loading}
              className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name="password"
              id='password'
              value={data.password}
              placeholder='Enter password'
              onChange={handleOnChange}
              disabled={loading}
              className='bg-gray-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Profile Photo:</label>
            <div className='h-14 bg-gray-100 flex justify-center items-center cursor-pointer border hover:border-blue-700' onClick={handleOpenFileUploader}>
              <input
                type='file'
                id='profile_pic'
                className='hidden'
                ref={inputFileRef}
                onChange={handleUploadProfilePic}
                disabled={loading}
              />
              {data.profile_pic ? (
                <p>{data.profile_pic.name}</p>
              ) : (
                <div className='flex items-center gap-3'>
                  <Image
                    src='/assets/icons/upload.svg'
                    width={25}
                    height={25}
                    alt='upload'
                  />
                  <p className='text-sm'>Upload profile image</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className='bg-blue-700 hover:bg-blue-800 py-2 px-4 font-semibold text-white rounded'
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </form>

        <div className='my-5'>
          <p>Already have an account? <Link href='/login' className='text-blue-700 hover:text-blue-800 hover:underline'>Login</Link></p>
        </div>

      </div>
    </section>
  );
}

export default Register;
