import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const WebinarFaqs = ({ faqData }) => {
  const [openIndices, setOpenIndices] = useState([]);
  const [isAllOpen, setIsAllOpen] = useState(false);

  // Toggle specific section
  const handleToggle = (i) => {
    if (openIndices.includes(i)) {
      setOpenIndices(openIndices.filter((index) => index !== i));
    } else {
      setOpenIndices([...openIndices, i]);
    }
  };

  // Expand all sections
  const handleExpandAll = () => {
    setOpenIndices(faqs.map((_, i) => i));
    setIsAllOpen(true);
  };

  // Hide all sections
  const handleHideAll = () => {
    setOpenIndices([]);
    setIsAllOpen(false);
  };

  const webinarFaq = faqData?.webinarFaq || {};
  const faqs = webinarFaq.questions || [];

  if (!faqData?.webinarFaq) {
    return <div className=" text-center py-2">FAQS Loading...</div>; // Show loading if data is not available
  }

  return (
    <>
      <div className="container py-5">
        {/* Suggested Webinars */}

        <div className="bg-white">
          {/* section 1 */}
          <div className="flex-col text-center md:pt-10 pb-2 md:pl-10 px-5 w-full">
            <p className="md:text-2xl text-lg font-semibold">
              Frequently Asked Questions (FAQS) for the Webinar
            </p>
          </div>
          <div className="md:w-3/4 max-w-4xl mx-auto pb-5">
            <div className="flex justify-end items-center pb-5 md:pr-0 pr-5">
              <button
                className="underline underline-offset-[6px] text-sm px-2 py-1.5 hover:bg-slate-100"
                onClick={isAllOpen ? handleHideAll : handleExpandAll}
              >
                {isAllOpen ? "Hide all" : "Expand all"}
              </button>
            </div>
            <div className="w-full mx-auto md:px-0 px-5">
              {faqs.map((faq, i) => (
                <div key={i} className="mb-3">
                  <div
                    onClick={() => handleToggle(i)}
                    className="w-full md:h-14 h-16 flex justify-between items-center px-5 py-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                    aria-expanded={openIndices.includes(i)}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <p className="md:text-[15px] text-[14px] capitalize md:first-line:font-semibold font-medium mr-1">
                      {faq.title}
                    </p>

                    <span>
                      {openIndices.includes(i) ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                    </span>
                  </div>
                  <div
                    id={`faq-answer-${i}`}
                    className={`overflow-hidden transition-max-height duration-100 ease-in-out ${
                      openIndices.includes(i) ? "max-h-[1000px]" : "max-h-0"
                    }`}
                    style={{
                      maxHeight: openIndices.includes(i) ? "1000px" : "0px",
                    }}
                  >
                    <div className="py-4 xl:px-10 px-7 text-xs md:text-sm">
                      <div
                        dangerouslySetInnerHTML={{ __html: faq?.information }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebinarFaqs;