import { useState } from "react";
import AdminLayout from "@/Component/admin/AdminLayout";
import BasicInfoCase from "@/Component/admin/CaseStudies/BasicInfoCase";

export default function CreateCaseStudy() {
  const [casestudyData, setCasestudyData] = useState(null);
  const [activeTab, setActiveTab] = useState("Tab1");
  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary pb-3">
        <p className="md:text-[28px] text-2xl text-black">Create Case Study</p>
      </div>
      <div className="border-b border-slate-300 mb-5">
        <div className="flex gap-2 text-[14px] pt-3 pb-2 flex-wrap">
          <button
            onClick={() => setActiveTab("Tab1")}
            className={`${
              activeTab === "Tab1"
                ? "border-b-2 scale-105 border-black text-black"
                : "border-black text-slate-500"
            } px-3 py-1`}
          >
            Basic Information
          </button>
        </div>
      </div>

      {/* Render each tab's content conditionally */}
      <div
        className={`tab-content ${activeTab === "Tab1" ? "block" : "hidden"}`}
      >
        <BasicInfoCase
          setActiveTab={setActiveTab}
          casestudyData={casestudyData}
        />
      </div>
    </AdminLayout>
  );
}
