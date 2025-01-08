import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../styles/contactform.css";

const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

const ContactForm = ({ showOnlyForm = false }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Envoi avec la clé:', WEB3FORMS_KEY);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: values.name,
          email: values.email,
          message: values.message,
          subject: 'Nouveau message du portfolio'
        }),
      });

      const data = await response.json();
      console.log('Réponse:', data);

      if (data.success) {
        alert('Message envoyé avec succès !');
        resetForm();
      } else {
        alert(`Erreur: ${data.message || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert(`Erreur lors de l'envoi: ${error.message}`);
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
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <div className={`${showOnlyForm ? '' : 'min-h-screen'} bg-gray-200 rounded-xl flex items-center justify-center`}>
              <div className="Form w-full max-w-2xl bg-gray-200 rounded-2xl shadow-xl p-8 mx-auto h-full">
                <div className="text-center mb-8">
                  <h2 id='contacts' className='text-4xl font-bold text-gray-800 mb-4'>Contactez moi !</h2>
                  <p className='text-lg text-gray-600 max-w-md mx-auto'>
                    Des questions ou des projets en vue ? Envoyez-moi simplement un message !
                  </p>
                </div>

                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Field
                      type="text"
                      name="name"
                      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="Votre nom"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="space-y-2">
                    <Field
                      type="email"
                      name="email"
                      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="votre@email.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="space-y-2">
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