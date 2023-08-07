import React from 'react'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
 import { UserAuth } from '../context/AuthContext'
// import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';




const DisplayingErrorMessagesSchema = Yup.object().shape({
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
  email: Yup.string().email('Invalid email')
    .required('Required'),
});


const Login = () => {

  const navigate = useNavigate();
   const { signIn } = UserAuth();

  const handleSigin = async (values) => {

    try {
      await signIn(values.email, values.password)
      navigate('/')

    } catch (error) {
      toast.error("Error: " + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });


    }
  }

  return (
    <div className='mx-auto max-w-[400px]  shadow-2xl mt-4 rounded-[16px] h-[450px] px-4 bg-primary '>

        <h1 className='text-2xl font-bold text-center pt-4'> Login </h1>

        <ToastContainer />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={handleSigin}>

          {({ errors, touched, isValid, handleBlur, handleChange, isSubmitting }) => (

            <Form>

              <div className='py-2'>

                <label className='font-medium'> Email </label>
                <div className='my-2 w-full relative rounded-2xl shadow-xl'>

                  <input className='w-full p-2 bg-primary border-input rounded-2xl'
                    type='email'
                    name="email"
                    placeholder="@mail"
                    onBlur={handleBlur}
                    onChange={handleChange} />

                  <AiOutlineMail className='absolute right-2 top-3' />

                  {/* If this field has been touched, and it contains an error, display it */}

                  {touched.email && errors.email && <div className="text-red-400 flex justify-end text-sm my-2 mr-2">{errors.email}</div>}
   
                </div>

              </div>


              <div className='my-4'>
                <label className='font-medium'> Password </label>
                <div className='my-2 w-full relative rounded-2xl shadow-xl'>

                  <input className='w-full p-2 bg-primary border-input rounded-2xl'
                    type='password'
                    name="password"
                    placeholder="password"
                    onBlur={handleBlur}
                    onChange={handleChange} />

                  <AiFillLock className='absolute right-2 top-3' />

                  {/* If this field has been touched, and it contains an error, display it*/}

                  {touched.password && errors.password && <div className="text-red-400 flex justify-end text-sm my-2 mr-2 ">{errors.password}</div>}

                </div>
              </div>

              <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
                type="submit"
                disabled={console.log(!isValid, "not valid")}
                style={{ backgroundColor: !isValid ? 'gray' : 'blue' }}
              >  {isSubmitting ? 'Signing In..' : 'Sign in'} </button>


            </Form>

          )}
        </Formik>

        <p> Don't have an account? <Link to='/signup' className='text-red-700 font-bold'> Sign Up </Link>  </p>

    </div>

  )
}

export default Login