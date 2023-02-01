import React from "react";

function Faq() {
  return (
    <div className="text-center text-md-start">
      <h2 className="text-center mb-4 mt-5">FAQ</h2>
      <p className="lead mt-4">Who is this Service for?</p>
      <p>
        Klover Healthcare is a privately-funded service, however it is designed
        to work collaboratively with NHS Mental Health Services. Klover
        Healthcare is aimed at being an affordable, accessible service for the
        British public, who are finding it difficult to get the right support
        for their mental health, in the most challenging time mental health
        services have seen, globally. We are a service for people who are
        struggling to communicate their mental health concerns with their GP,
        but who also cannot afford to spend thousands of pounds for private
        healthcare. We are a Budget-friendly healthcare service who will
        streamline your GP appointment.
      </p>
      <p className="lead mt-4">How are Recommendations made?</p>
      <p>
        Klover Healthcare Clinicians work collaboratively with patients, to form
        an understanding of a person’s life experience, life stressors, current
        problems, perpetuating actions, and possible resolutions to this. An
        assessment report can be prepared, to be provided to the Patient who can
        hand this to their GP to discuss in a GP appointment.
      </p>
      <p className="lead mt-4">
        {" "}
        What if my GP doesn’t want to action Klover Healthcare Recommendations?{" "}
      </p>
      <p>
        Klover Healthcare Clinicians can make GP Recommendations for referrals
        to further specialist Psychiatry services in the NHS, however, different
        NHS Trusts are facing varying challenges, meaning there may be a variety
        of reasons why further referrals may not be accepted. This is something
        Klover Healthcare can provide support with in ensuring this process is
        completed smoothly. Klover Healthcare Clinicians can make GP
        Recommendations for medication to be prescribe, however, since we do not
        have full access to all medical records, it may be that the GP is not
        able to adhere to such recommendations, but can consider an alternative
        medication. Please bear in mind Klover Healthcare cannot offer refunds
        but will accommodate any issues or obstacles.
      </p>
      <p className="lead mt-4">What if my GP has a question?</p>
      <p>
        GPs are welcome to contact Klover Healthcare Clinicians by email to
        arrange a telephone appointment.
      </p>
      <p className="lead mt-4">
        Can I bypass the wait time to see a Psychiatrist?
      </p>
      <p>
        Klover Healthcare offers a psychiatric assessment, which can provide
        recommendations, which could include treatment with a Psychiatrist or
        Secondary Care Psychologist. This means that Klover Healthcare can
        understand the intricacy of your mental health concern, but it may still
        be for an NHS Psychiatrist to offer treatment. However, should the
        outcome of the Klover Healthcare assessment be that the GP is able to
        follow-up care and treatment, this will inevitably speed up the time to
        treatment.
      </p>
      <p className="lead mt-4">Can I be assessed for ADHD or Autism?</p>
      <p>
        Klover Healthcare will not offer formal diagnosis for neurodiversity,
        due to the complex nature of these assessments. However, Klover
        Healthcare Clinicians are able to prepare a report to support you GP to
        make such referrals for NHS assessments, as our clinicians are able to
        identify and communicate to GPs the specific information needed for NHS
        referrals for ADHD or Autism to be accepted.
      </p>
      <p className="lead mt-4">
        Can I request for medication to be prescribed?
      </p>{" "}
      <p>
        Since Klover Healthcare does not have access to your full medical
        records, no prescriptions will be prepared. However, we can make
        recommendations for GPs to prescribe medication.
      </p>
    </div>
  );
}

export default Faq;
