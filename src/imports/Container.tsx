function Button() {
  return (
    <div className="bg-gradient-to-b from-[#ffb7c5] h-[44px] relative rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#ff9fb7] w-[81.266px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[81.266px]">
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[16px] left-[12px] text-[12px] text-nowrap text-white top-[14px] whitespace-pre">+1K Steps</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-b from-[#c8b8ff] h-[44px] relative rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#a99eff] w-[81.266px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[81.266px]">
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[16px] left-[12px] text-[12px] text-nowrap text-white top-[14px] whitespace-pre">+5K Steps</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}