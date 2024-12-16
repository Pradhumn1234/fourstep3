import React, { useEffect, useState } from "react";
import Head from "next/head";

const SeoPage = ({ webinarData, setActiveTab }) => {
  const [isSEOField, setIsSEOField] = useState({
    tags: "",
    canonicalUrl: "",
    keyword: "",
  });
useEffect(()=>{
  if(webinarData){
setIsSEOField({
  tags:webinarData?.webinarSeo?.tags,
  canonicalUrl:webinarData?.webinarSeo?.canonicalUrl,
  keyword:webinarData?.webinarSeo?.keyword,
})
  }
},[webinarData])

  const [validationErrors, setValidationErrors] = useState({
    tags: "",
    canonicalUrl: "",
    keyword: "",
  });

  const handleMetaTag = (e) => {
    const { name, value } = e.target;
    setIsSEOField((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const handleSubmitSeoField = async() => {
    try {
      const response = await fetch(`/api/webinar/webinarseo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seoData: isSEOField ,webinar:webinarData?._id}),
      });
      if (response.ok) {
        setActiveTab("Tab1");
        alert(webinarData?"data is updated successfully":"data is saved is successfully")
      }
      // console.log("currently data pass", itineraryDayWiseDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Head>
                <title>SEO Form</title>
                <meta name="description" content={isSEOField.description} />
                <meta property="og:title" content={isSEOField.title} />
                <meta property="og:type" content="product"/>
                <meta property="og:description" content={isSEOField.description} />
                <meta property="og:url" content={isSEOField.canonicalUrl} />
                <meta property="og:site_name" content="bizare expedition" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:description" content={isSEOField.description} />
                <meta name="twitter:image" content="" />
                <link rel="canonical" href={isSEOField.canonicalUrl} />
            </Head> */}
      <div className="">
        <p className=" font-semibold  pb-3">SEO FIELDS</p>
        <form
          className="border rounded p-3 bg-white"
          onSubmit={handleSubmitSeoField}
        >
          {/* Title */}
          <div className="flex flex-col mb-2">
            <label className="text-para font-semibold" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              value={isSEOField.tags}
              onChange={handleMetaTag}
              className="h-8 px-2 rounded border text-para"
              type="text"
            />
            <span className="text-xs text-red-700">
              {validationErrors.tags}
            </span>
          </div>

          {/* Canonical URL */}
          <div className="flex flex-col mb-2">
            <label className="text-para font-semibold" htmlFor="canonicalUrl">
              Canonical URL:
            </label>
            <input
              id="canonicalUrl"
              name="canonicalUrl"
              value={isSEOField.canonicalUrl}
              onChange={handleMetaTag}
              className="h-8 px-2 rounded border text-para"
              type="text"
            />
          </div>
          {/* keyword */}
          <div className="flex flex-col mb-2">
            <label className="text-para font-semibold" htmlFor="keyword">
              Keyword
            </label>
            <input
              id="keyword"
              name="keyword"
              value={isSEOField.keyword}
              onChange={handleMetaTag}
              className="h-8 px-2 rounded border text-para"
              type="text"
            />
          </div>

          <button
            className="mt-2 w-full h-8 px-2 rounded bg-black text-white"
            type="submit"
          >
            Save Meta Tags
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeoPage;
