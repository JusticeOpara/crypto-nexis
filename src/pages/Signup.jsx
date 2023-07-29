import React from 'react'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
 import { UserAuth } from '../context/AuthContext'
import { Formik, Form, Field, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DisplayingErrorMessagesSchema = Yup.object().shape({

  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});



const Signup = () => {

  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSignup = async () => {
  
    try {
      await signUp(email, password)
      navigate('/account')
    } catch (error) {

      toast.error("Error: " + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      // console.log(error, "-TOASTERROR")

    }
  }



  return (
    <div>
      <div>
        <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
          <h1 className='text-2xl font-bold text-center'> Sign Up </h1>
          {/* {error ? <p className='bg-red-300 my-2'>{setError} </p> : null} */}
          <ToastContainer />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}

            validationSchema={DisplayingErrorMessagesSchema}

            onSubmit={handleSignup}
          >

            {({ errors, touched, isValid, handleChange, handleBlur, handleSubmit, isSubmitting }) => {

              return <Form onSubmit={handleSubmit}>

                <div className='py-4'>

                  <label> Email </label>

                  <div className='my-2 w-full relative rounded-2xl shadow-xl'>

                    <input className='w-full p-2 bg-primary border-input rounded-2xl'
                      type='email'
                      name="email"
                      placeholder="@mail"
                      onBlur={handleBlur}
                      onChange={handleChange} />

                    <AiOutlineMail className='absolute right-2 top-3' />
                    {touched.email && errors.email && <div className="error">{errors.email}</div>}

                  </div>

                </div>



                <div className='my-4'>

                  <label> Password </label>

                  <div className='my-2 w-full relative rounded-2xl shadow-xl'>

                    <input className='w-full p-2 bg-primary border-input rounded-2xl'
                      type='password'
                      name="password"
                      placeholder="password"
                      onBlur={handleBlur}
                      onChange={handleChange} />

                    <AiFillLock className='absolute right-2 top-3' />
                    {touched.password && errors.password && <div className="error">{errors.password}</div>}

                  </div>

                </div>


                <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl' type="submit" disabled={!isValid}
                  style={{ backgroundColor: !isValid ? 'gray' : 'blue' }}>

                  {isSubmitting ? 'Creating account..' : 'Sign up'}

                </button>


              </Form>

            }}

          </Formik>


          <p> Already have an account? <Link to='/signin' className='text-green-700 font-bold'> Login </Link>  </p>

        </div>
      </div>
    </div>
  )
}

export default Signup