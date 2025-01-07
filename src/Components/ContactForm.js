import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser'; 
import "../styles/contactform.css"
const ContactForm = ({ showOnlyForm = false }) => {
  useEffect(() => {
    // Initialiser EmailJS
    emailjs.init(process.env.REACT_APP_EMAILJS_TOKEN);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  const sendEmail = async (values, resetForm, setSubmitting) => {
    try {
      await emailjs.send(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        {
          name: values.name,
          email: values.email,
          message: values.message,
        }
      );
      
      alert('Message envoyé avec succès !');
      resetForm();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Échec de l\'envoi du message, veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={`contact-form-section ${showOnlyForm ? '' : 'min-h-screen'} mt-12`}>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            sendEmail(values, resetForm, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <div className={`${showOnlyForm ? '' : 'min-h-screen'} bg-gray-200 rounded-xl flex items-center justify-center `}>
              <div className="Form w-full max-w-2xl bg-gray-200 rounded-2xl shadow-xl p-8 mx-auto h-full">
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
      </div>
    </>
  );
};

export default ContactForm;