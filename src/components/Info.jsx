import React from "react";

function Info() {
  return (
    <div>
      <h2 className="text-center mb-4">Specialised Assessments</h2>
      <p className="lead">
        Get a mental health assessments in the primary care setting – this means
        that when going to the GP regarding an issue or concern regarding mental
        health, but feel limited by the time restrictions in place, I can offer
        a more detailed specialised assessment to provide GPs with a treatment
        recommendation.
      </p>
      <p>
        This service is ideal for those that feel they have on-going mental
        health problems but are able to continue functioning – in the sense that
        a person can keeping on ticking by but they feel as though there is some
        lack of clarity regarding their mental health, or options to resolve
        these.{" "}
      </p>
      <p>
        Please note, though I offer a broad service,{" "}
        <span className="fst-italic">
          I cannot provide formal ADHD assessments or ASD diagnosis, though we
          can discuss these.
        </span>
      </p>
      <div className="alert alert-danger text-dark">
        If you are having suicidal thoughts or are in another mental health
        emergency, contact your Local Mental Health Crisis Service or Emergency
        Services as soon as possible.
      </div>
    </div>
  );
}

export default Info;
