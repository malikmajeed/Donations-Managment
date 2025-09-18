import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Phone, MapPin, GraduationCap, X, Heart, Crown } from "lucide-react";
import { Sponsorship } from "../ui/Sponsorship";
import { SponsorButton } from "../buttons";




export default function StudentDialog({ student }) {
  if (!student) return null;

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:3000${url}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.toString().replace(/\D/g, "");
    if (cleaned.length >= 10) {
      const last10 = cleaned.slice(-10);
      return `(${last10.slice(0, 3)}) ${last10.slice(3, 6)}-${last10.slice(6)}`;
    }
    return phone;
  };

  return (
    <>


      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl overflow-hidden z-[60]">
          {/* Header */}
          <div className="relative px-4 pt-8 pb-6 bg-gradient-to-br from-slate-50 to-white">
            <Dialog.Close asChild>
              <button className="absolute top-8 right-6 p-2 rounded-full hover:bg-white/80 transition-colors focus:outline-none">
                <X className="w-5 h-5 text-slate-400 hover:text-black" />
              </button>
            </Dialog.Close>
            
            <div className="flex flex-row items-start text-center">
              {student.profileUrl ? (
                <img
                  src={getImageUrl(student.profileUrl)}
                  alt={`${student.firstName}'s profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Show initials fallback
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              {(!student.profileUrl || !getImageUrl(student.profileUrl)) && (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-600 border-4 border-white shadow-lg">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
              )}

              <div className="flex flex-col pl-3 gap-3 items-start justify-between">
              <h1 className="text-2xl font-bold text-slate-900 mt-4">
                {student.firstName} {student.lastName}
              </h1>
              
              <Sponsorship sponsored={student.sponsorship} />
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Quick Info */}
            <div className="grid grid-cols-[3fr_2fr_1fr] gap-1">
            <div>
                <p className="text-xs font-medium text-slate-500 capitalize tracking-wide">Father</p>
                <p className="text-slate-900 font-medium">{student.fatherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 capitalize tracking-wide">Grade</p>
                <p className="text-slate-900 font-medium">{student.studentGrade || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 capitalize tracking-wide">Age</p>
                <p className="text-slate-900 font-medium">
                  {student.dateOfBirth ? new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear() : "N/A"} years
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone</p>
                  <p className="text-slate-900">{formatPhoneNumber(student.phone)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Location</p>
                  <p className="text-slate-900">{student.address || "N/A"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">School</p>
                  <p className="text-slate-900">{student.school || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {student.introduction && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">About</p>
                <p className="text-slate-700 leading-relaxed">{student.introduction}</p>
              </div>
            )}

            {/* Sponsorship CTA */}
            
              <div className="pt-4  flex flex-col items-center justify-center border-t border-slate-100">
                
                <SponsorButton item={student}> Sponsor Now!</SponsorButton>
              
                <p className="text-sm text-slate-500 text-center mt-2">
                  Help {student.firstName} {student.lastName} achieve their educational goals
                </p>
              </div>
         
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}