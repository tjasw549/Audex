import FooterNav from "./FooterNav";

const FooterTop = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 pb-8 border-b border-[#ddeeff]/10">
      
      {/* Brand */}
      <div className="flex flex-col gap-3">
        <div className="font-['Bebas_Neue'] text-[32px] sm:text-[28px] tracking-wider text-[#ddeeff] leading-none">
          Aud<span className="text-[#00c8ff]">ex</span>
        </div>

        <p className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#ddeeff]/30 max-w-[260px] leading-relaxed">
          A music discovery platform - browse, filter, and collect.
        </p>
      </div>

      <FooterNav />
    </div>
  );
}

export default FooterTop;