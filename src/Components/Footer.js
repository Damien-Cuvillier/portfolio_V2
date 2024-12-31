import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';

const EMAILJS_TOKEN = process.env.REACT_APP_EMAILJS_TOKEN;
const SERVICEID= process.env.REACT_APP_SERVICEID;
const TEMPLATEID= process.env.REACT_APP_TEMPLATEID;

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  const sendEmail = (values, resetForm, setSubmitting) => {
    const serviceID = SERVICEID;
    const templateID = TEMPLATEID;
    const userID = EMAILJS_TOKEN;

    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        alert('Message envoyé avec succès !');
        resetForm();
        setSubmitting(false);
      }, (error) => {
        alert('Échec de l\'envoi du message, veuillez réessayer.');
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendEmail(values, resetForm, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center px-4'>
          <div className="w-full max-w-2xl bg-gray-200 rounded-2xl shadow-xl p-8 mx-auto">
            <div className="text-center mb-8">
              <h2 id='contacts' className='text-4xl font-bold text-gray-800 mb-4'>Contactez moi !</h2>
              <p className='text-lg text-gray-600 max-w-md mx-auto'>
                Des questions ou des projets en vue ? Envoyez-moi simplement un message !
              </p>
            </div>

            <Form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 bg-gray-100">
                  
                </label>
                <Field
                  type="text"
                  name="name"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                  placeholder="Votre nom"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                 
                </label>
                <Field
                  type="email"
                  name="email"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                  placeholder="votre@email.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                 
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows="6"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out resize-none"
                  placeholder="Votre message..."
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl text-lg font-semibold text-white transition duration-150 ease-in-out
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:shadow-lg'
                  }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;