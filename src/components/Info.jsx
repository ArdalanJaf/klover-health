import React from "react";

function Info() {
  return (
    <div>
      <h2 className="text-center mb-4">Specialised Assessments</h2>
      <p className="lead">
        Klover Healthcare was born from an observation of both an overstretched
        NHS GP Service and an overstretched NHS Mental Health Service. Often
        people feel unsupported and frustrated in trying to navigate this
        system, seeing a GP and explaining the complexities of their mental
        health in 8-15 minutes is a challenge for the both the GP and the
        Patient. This is where Klover Healthcare comes in.{" "}
      </p>
      <p>
        Klover Healthcare is designed to bridge difficulties in communication.
        Klover Healthcare Clinicians will do an in-depth 2 hour mental health
        consultation that your GP simply cannot accommodate. A GP report can be
        developed to contain a Psychiatric Assessment and any recommendations
        regarding further treatment.
      </p>
      <p>
        This service is designed to assist those who feel they need support in
        being directed to access the most suitable support for their mental
        health. GP consultations can feel rushed, pressured, and often
        frustrating, leaving you with the feeling of not being adequately
        supported or even further isolated in your mental health. Klover
        Healthcare is there to enable your GP to swiftly action our proposed
        bespoke Care Plan as you would have already been seen by a specialist, a
        Psychiatrist.
      </p>
      <p className="fst-italic">
        This service does not extend to secondary care input, meaning we do not
        provide specialist assessments such ADHD or Autism assessments, nor will
        we provide medication prescriptions, although we can make such
        recommendations for GPs to refer further neurodiversity assessments and
        treatments.
      </p>
      <p>
        An initial FREE <a href="#contact">pre-assessment telephone call</a> is
        offered to discuss any questions you have and ensure this is the best
        service for you.
      </p>
      <p>
        Klover Healthcare ensures it is an advocate for you in accessing mental
        health services.
      </p>
      <div className="alert alert-danger text-dark fw-bold text-center">
        If you are having suicidal thoughts or another mental health emergency,
        contact your Local Mental Health Crisis Service or Emergency Services as
        soon as possible.
      </div>
      <div className="mt-5 mb-5"></div>
      <h4 className="text-center mt-3  mb-3">Services Offered</h4>
      <ul>
        <li>
          FREE 15 minute{" "}
          <a href="#contact">pre-assessment telephone consultation</a> to
          identify mental health concerns.
        </li>

        <li>
          Up to 2 hour Psychiatric assessment (by telephone, zoom or in-person
          options available) to formulate mental health concerns.
        </li>

        <li>
          Assessment report for your GP to action, including treatment
          recommendations, referrals to NHS secondary care services (to be seen
          by an NHS psychiatrist or Community Psychiatric Nurse).
        </li>
        <li>Signposting to appropriate services local to the patient.</li>
      </ul>
    </div>
  );
}

export default Info;
