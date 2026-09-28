import React, { useState } from 'react';
import { ClaimTicket } from '../../types';
import { INITIAL_CLAIMS } from '../../data/mockData';

export const ClaimsScreen: React.FC = () => {
  const [claims, setClaims] = useState<ClaimTicket[]>(INITIAL_CLAIMS);
  const [trackingId, setTrackingId] = useState('');
  const [issueType, setIssueType] = useState('تأخر فـ التسليم');
  const [description, setDescription] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim() || !description.trim()) return;

    const newClaimId = `#REC-${Math.floor(100 + Math.random() * 900)}`;
    const newClaim: ClaimTicket = {
      id: newClaimId,
      trackingId: trackingId.trim(),
      issueType,
      description: description.trim(),
      solution: 'تم استلام الشكاية وفريق العمليات اللوجستية كيتواصل مع السائق دابا.',
      status: 'investigating',
      statusText: 'كيتعالج المشكل',
      createdAt: 'الآن',
      clientCity: 'الدار البيضاء',
    };

    setClaims([newClaim, ...claims]);
    setSuccessToast(`تم تسجيل الشكاية بنجاح ورقم الملف هو ${newClaimId}`);
    setTrackingId('');
    setDescription('');
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#b91a24]">
              الشكايات والرجوع (Réclamations)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              معالجة فورية لحالات التعثر، الطرود المتضررة أو الروتور
            </p>
          </div>
          <span className="material-symbols-outlined text-[#b91a24] text-3xl">
            assignment_late
          </span>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <span>{successToast}</span>
          </div>
        )}

        {/* Submit Claim Form */}
        <form onSubmit={handleSubmit} className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-3 border border-[#e1e2e4]/70">
          <span className="text-xs font-bold text-[#191c1e] block">
            تسجيل شكاية أو طلب إرجاع:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#575e70] block mb-1">
                رقم التتبع <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:border-[#b91a24]"
                placeholder="NG-2026-..."
                required
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#575e70] block mb-1">
                نوع الإشكال
              </label>
              <select
                className="w-full h-10 px-2 rounded-lg bg-white border border-[#e1e2e4] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:border-[#b91a24]"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option value="تأخر فـ التسليم">تأخر فـ التسليم</option>
                <option value="الزبون ما كيجاوبش">الزبون ما كيجاوبش</option>
                <option value="السلعة متضررة">السلعة متضررة</option>
                <option value="عنوان غالط / تبدل">عنوان غالط / تبدل</option>
                <option value="طلب إرجاع السلعة (Retour)">طلب إرجاع السلعة (Retour)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#575e70] block mb-1">
              شرح المشكل بالتفصيل <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-2.5 rounded-lg bg-white border border-[#e1e2e4] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:border-[#b91a24] resize-none"
              placeholder="اكتب شنو وقع باش نحلو المشكل فـ أقرب وقت..."
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="w-full h-11 rounded-xl bg-[#b91a24] hover:bg-[#96121b] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            type="submit"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>صيفط الشكاية للمعالجة العاجلة</span>
          </button>
        </form>

        {/* Existing Claims List */}
        <div className="space-y-2.5 pt-2">
          <span className="text-xs sm:text-sm font-bold text-[#191c1e] block">
            شكايات قيد المعالجة ({claims.length}):
          </span>

          <div className="space-y-2.5">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-1.5 border border-[#e1e2e4]/70"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-chivo font-black text-sm text-[#191c1e]" dir="ltr">
                      {claim.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        claim.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#ffdad7] text-[#410004]'
                      }`}
                    >
                      {claim.statusText}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#575e70]">{claim.createdAt}</span>
                </div>

                <div className="text-xs text-[#575e70]">
                  <strong className="text-[#191c1e]">الإشكال:</strong> {claim.issueType} · إرسالية:{' '}
                  <span className="font-chivo font-bold text-[#785a00]" dir="ltr">
                    {claim.trackingId}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#191c1e]">{claim.description}</p>

                <div className="pt-1 text-xs text-[#785a00] bg-white p-2 rounded-lg border border-[#e1e2e4]">
                  <strong>الحل المقترح / الإجراء:</strong> {claim.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
