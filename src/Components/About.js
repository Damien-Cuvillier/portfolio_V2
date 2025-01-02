import React from 'react';
import '../styles/About.css';

const TestimonialSection = () => {

  return (
    <section className="section testimonial tf8-position-relative tf8-z-index-1 tf8-padding-y-2xl bg-gray-200">
      <div id="about" className="tf8-container tf8-max-width-adaptive-sm py-16">
        <h2 className='testimonial__block-wrapper tf8-margin-bottom-lg text-3xl font-bold text-gray-800 border-t-2 border-gray-800 w-60 mx-auto pt-4'>A Propos de moi</h2>
        <figure className="tf8-flex tf8-justify-center tf8-margin-bottom-md reveal-fx reveal-fx--scale mt-12">
            <img
              className="tf8-block tf8-width-2xl tf8-height-2xl tf8-radius-50% tf8-border tf8-border-bg tf8-border-2 tf8-shadow-sm rounded-full object-cover"
              src={process.env.PUBLIC_URL + '/images/photo_Damien.webp'}
              alt="Damien Cuvillier"
            />
          </figure>

        <div className="testimonial__block-wrapper tf8-margin-bottom-lg">
          <blockquote className="tf8-text-lg tf8-text-center tf8-line-height-md">
            Passionné par le développement front-end, je place l'expérience utilisateur et l'accessibilité au cœur de mes projets.
            <br />Mon objectif est de créer des interfaces centrées sur l'Humain, qui soient à la fois esthétiques et fonctionnelles.
            <br />J'ai travaillé sur plusieurs projets intéressants que je serais ravi de partager avec vous. Si vous souhaitez en savoir plus, je vous invite à découvrir mon portfolio.
          </blockquote>

          <svg className="tf8-icon tf8-icon--2xl tf8-color-contrast-higher tf8-opacity-10%" aria-hidden="true" viewBox="0 0 64 64">
            <polygon fill="currentColor" points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
            <polygon fill="currentColor" points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
          </svg>
        </div>

        <div className="tf8-text-center">
          <p className="tf8-text-uppercase tf8-letter-spacing-md">
            <strong>Damien Cuvillier</strong>
          </p>
          <p className="tf8-color-contrast-medium tf8-margin-top-4xs">Développeur web</p>
          
          <figure className="tf8-flex tf8-justify-center tf8-margin-bottom-md reveal-fx reveal-fx--scale">
          <img
            className="tf8-block tf8-width-2xl tf8-height-2xl tf8-radius-50% tf8-border tf8-border-bg tf8-border-2 tf8-shadow-sm rounded-full mt-4"
            src={process.env.PUBLIC_URL + '/images/logo.jpg'}
            alt="Logo"
          />
        </figure>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
