import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function Smallprint({ content }) {
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: "800px" }}>
        {content === 0 && (
          <div>
            <h2 className="text-center mb-4 mt-5">Terms & Conditions</h2>
            <p> The registered name of the company is Klover Healthcare Ltd.</p>
            <p>
              Use of this website is governed by these Terms and Conditions and
              you agree to be bound by them each time you access the website.
            </p>
            <p>
              The material on this website is provided purely for your
              information and you should seek further guidance and make
              independent inquiries before relying on it. Klover Healthcare Ltd
              may make alterations to the website at any time. You will be
              deemed to accept such alterations when you next use the website
              following any such alteration.
            </p>
            <p>
              The information on this website is updated from time to time.
              Whilst Klover Healthcare Ltd has made every effort to ensure the
              accuracy and completeness of information on this website, Klover
              Healthcare Ltd makes no representations or warranties whatsoever,
              express or implied, as to the quality, accuracy or completeness of
              such information.
            </p>
            <p>
              Klover Healthcare Ltd may without notice modify, suspend, or
              discontinue the website or any part of it at any time without any
              liability to you or any third party.
            </p>
            <p>
              To the full extent permitted by law, Klover Healthcare Ltd accepts
              no liability in contract, tort or otherwise (including liability
              for negligence), for loss or damage of any kind including without
              limitation, direct or indirect loss or damage, loss of business,
              revenue or profits, corruption or destruction of data, or any
              other consequential loss or damage arising out of your use or
              inability to use the website (or other site linked to the website)
              or in connection with any computer virus or system failure and
              Klover Healthcare Ltd excludes any such liability even if Klover
              Healthcare Ltd is expressly advised of the possibility of such
              damage or loss.
            </p>
            <p>
              You will indemnify Klover Healthcare Ltd against all costs,
              losses, expenses or other liabilities incurred by Klover
              Healthcare Ltd arising from the use of the website by you.
            </p>
            <p className="fw-bold mt-5"> Lawful Use</p>
            <p>You will use the website for lawful purposes only.</p>{" "}
            <p className="fw-bold mt-5">Links</p>
            <p>
              You should note that Klover Healthcare Ltd provides links to web
              sites maintained by others. Klover Healthcare Ltd accepts no
              responsibility or liability for the accuracy or legality of any
              content contained in such websites. The fact that you may use a
              Klover Healthcare Ltd link to access other websites is not an
              endorsement by Klover Healthcare Ltd of any content contained in
              those websites. Neither you nor any third party may link another
              site to the Klover Healthcare Ltd website without Klover
              Healthcare Ltd’s prior written consent.
            </p>
            <p className="fw-bold mt-5">Copyright</p>
            <p>
              Unless otherwise stated, the copyright and similar rights in this
              web site and in all the material contained on this website belong
              to Klover Healthcare Ltd. You are only permitted to copy or print
              extracts of the material for your own personal use. You may not
              use any of this material for commercial or public purposes. 
            </p>
            <p>
              Without Klover Healthcare Ltd’s written permission, you may not
              (whether directly or indirectly including through the use of any
              programme) create a database in an electronic or other form by
              downloading and storing all or any part of the pages from this
              website. Without the permission of Klover Healthcare Ltd, no part
              of this website may be reproduced, transmitted to or stored on any
              other website, disseminated in any electronic or non-electronic
              form, or included in any public or private electronic retrieval
              system.
            </p>
            <p className="fw-bold mt-5">
              Changes to these Terms and Conditions{" "}
            </p>
            <p>
              Klover Healthcare Ltd may add to or change these Terms and
              Conditions from time to time. You are deemed to have accepted
              changed or additional Terms and Conditions when you access the
              website following any such change or addition.
            </p>
            <p className="fw-bold mt-5">
              {" "}
              Information that you post on the website{" "}
            </p>
            <p>
              Klover Healthcare Ltd reserves the right, at your cost, at any
              time to remove any material from the site which it believes to be
              salacious, defamatory, or offensive or which Klover Healthcare Ltd
              believes may be in breach of a third party’s rights, such as a
              third party’s intellectual property or confidentiality rights. You
              agree to indemnify Klover Healthcare Ltd on a full and continuing
              basis against any loss or damage suffered or costs (including
              legal costs) incurred by Klover Healthcare Ltd in defending any
              action brought against Klover Healthcare Ltd as a result of any
              information you have posted on the website.
            </p>
            <p className="fw-bold mt-5">
              {" "}
              Governing Law and Applicable Legislation{" "}
            </p>
            <p>
              These Terms and Conditions are governed by English law and you
              agree that the English courts shall have exclusive jurisdiction to
              determine any matter or dispute arising out of or in connection
              with use of this website and these Terms and Conditions.
            </p>
            <p>
              It is not intended that a third party should have the right to
              enforce any provision of the Terms and Conditions pursuant to the
              Contracts (Rights of Third Parties) Act 1999 and furthermore
              Klover Healthcare Ltd may, and without the consent of a third
              party to whom the right of enforcement of any of the terms has
              been expressly provided vary and amend the Terms and Conditions.
            </p>
            <p>
              Use of this website may not be allowed in countries outside the
              United Kingdom where such use may be contrary to local law or
              regulation. If you access information on this website, it is your
              sole responsibility to ensure compliance with any applicable laws
              or regulations in any other country. Any use of this website
              outside the United Kingdom is your responsibility and we accept no
              liability whatsoever in connection with such use.
            </p>
            <p>
              Klover Healthcare Ltd has the right at any time to terminate or
              suspend access to, or use of, the website where Klover Healthcare
              Ltd reasonably believes you have infringed the Terms and
              Conditions.
            </p>
            <p>
              Klover Healthcare Ltd.’s Registered Office is:{" "}
              <span className="numFont">
                23 The Drive, Barking, Essex, United Kingdom, IG11 9JE
              </span>
            </p>
            <p>
              {" "}
              Registered in England No:
              <span className="numFont"> 13393249</span>
            </p>
          </div>
        )}

        {content === 1 && (
          <div>
            <h2 className="text-center mb-4 mt-5">Modern Slavery Policy</h2>
            <p>
              1. Klover Healthcare Ltd is committed to eliminating modern
              slavery, human trafficking, forced labour, and similar human
              rights abuses.
            </p>
            <p>
              2. Klover Healthcare Ltd is committed to ensuring that its staff
              and any workers it supplies (directly or indirectly) are not
              subject to behaviour or threats that may amount to modern slavery,
              human trafficking, forced labour, and similar human rights abuses.
            </p>
            <p>
              3. Klover Healthcare Ltd provides appropriate training and
              awareness information for all its staff.
              <br />
              In particular: <br />
              a) Our leadership team receive detailed training in identifying
              and resolving concerns around modern slavery and human
              trafficking. <br />
              b) All our staff receive awareness-raising information around
              issues involving modern slavery and human trafficking, so that
              they can bring any concerns they have to the attention of
              management.
            </p>
            <p>
              4. Any staff, workers or other parties are strongly encouraged to
              report any concerns or suspicions that they might have to a
              Director of Klover Healthcare.
            </p>
            <p>
              5. Reports surrounding these issues are taken extremely seriously
              by our board of directors, who are committed to ensuring that all
              investigations shall be prompt and effective. If our
              investigations reveal any issues, we are committed to taking
              appropriate action, including but not limited to:
              <br />- Working with the appropriate organisations to improve
              standards,
              <br />- Removing that organisation from our preferred supplier
              list,
              <br />- Passing details to appropriate law enforcement bodies.
            </p>
            <p>
              6. We regularly monitor our risks in this area using relevant key
              performance indicators, including:
              <br />- The percentage of suppliers who sign up to an appropriate
              code / provide their own modern slavery statements,
              <br />- The effectiveness of enforcement against suppliers who
              breach policies,
              <br />- The amount of time spent on audits, re-audits, spot
              checks, and related due diligence, and
              <br />- The level of modern slavery training and awareness amongst
              our staff.
            </p>
            <p>
              7. As part of our efforts in this area, we publish a modern
              slavery statement on an annual basis.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Smallprint;
