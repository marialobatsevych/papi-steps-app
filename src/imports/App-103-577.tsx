import svgPaths from "./svg-v9hygiusbt";
import imgContainer from "figma:asset/ac07d83922ffd5b6c2d62affefe76615b484d899.png";
import imgEvolutionPapiCharacter from "figma:asset/5c6d87ed47052534cfc24f0348347ba4b45a453e.png";

function Container() {
  return (
    <div className="absolute h-[862px] left-0 top-0 w-[430px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-gradient-to-t from-[#ffffff] h-[500px] left-0 to-[rgba(0,0,0,0)] top-[362px] via-50% via-[rgba(255,255,255,0.8)] w-[430px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 10">
            <path d={svgPaths.p2d4a5640} fill="var(--fill-0, #333333)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="MenuIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative size-[20px]">
        <Icon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[20px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] shrink-0 size-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <MenuIcon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[16px] left-0 text-[12px] text-white top-0 w-[28px]">Baby Papi</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[30px] opacity-90 relative shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shrink-0 w-[50.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-[50.391px]">
        <p className="absolute font-['Nunito:Regular',_'Noto_Sans_Symbols:Regular',_sans-serif] font-normal leading-[15px] left-0 text-[10px] text-white top-[-1px] w-[40px]">→ teenager</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[111.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-[111.141px]">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[32px] relative shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shrink-0 w-[68.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68.859px]">
        <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[16px] left-0 text-[12px] text-white top-0 w-[39px]">10,550 steps</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute box-border content-stretch flex h-[32px] items-center justify-between left-0 px-[4px] py-0 top-0 w-[188px]" data-name="Container">
      <Container2 />
      <Text2 />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] h-[12px] left-0 opacity-50 to-[rgba(0,0,0,0)] top-0 via-50% via-[#ffffff] w-[10.313px]" data-name="Container" />;
}

function Container5() {
  return <div className="bg-white h-[7.579px] opacity-[0.558] rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[6.31px] pb-0 pt-[0.211px] px-[0.211px] size-[8px] top-[2px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-gradient-to-b from-[#c8b8ff] h-[12px] relative rounded-[3.35544e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#c8b8ff] via-50% via-[#a99eff] w-full" data-name="Container">
      <Container4 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[12px] items-start left-0 overflow-clip pl-0 pr-[177.688px] py-0 rounded-[3.35544e+07px] top-[38px] w-[188px]" data-name="Container">
      <Container7 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_4px_0px_inset_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[15px] left-[87.66px] opacity-80 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] top-[54px] w-[96.344px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',_sans-serif] font-normal leading-[15px] left-0 text-[10px] text-white top-[-1px] w-[97px]">9,450 steps to evolve</p>
    </div>
  );
}

function EvolutionProgress() {
  return (
    <div className="h-[69px] relative shrink-0 w-full" data-name="EvolutionProgress">
      <Container3 />
      <Container8 />
      <Text3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[95px] min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)]" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[95px] items-start pb-px pt-[13px] px-[17px] relative w-full">
          <EvolutionProgress />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.33%_33.33%_62.5%_33.33%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 6">
            <path d={svgPaths.p21639b00} fill="var(--fill-0, #FFD66C)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[37.5%_58.33%_33.33%_8.33%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 6">
            <path d={svgPaths.p21639b00} fill="var(--fill-0, #FFD66C)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[37.5%_8.33%_33.33%_58.33%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 6">
            <path d={svgPaths.p21639b00} fill="var(--fill-0, #FFD66C)" id="Vector" />
          </svg>
        </div>
        <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[54.17%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 7">
            <path d={svgPaths.p33d6be00} fill="var(--fill-0, #FFD66C)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PawIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="PawIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative size-[20px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[22.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] relative w-full">
        <p className="absolute font-['Nunito:Bold',_sans-serif] font-bold leading-[22.5px] left-0 text-[#333333] text-[15px] text-nowrap top-0 whitespace-pre">1680</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[46.5px] relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[46.5px] items-center px-[16px] py-0 relative w-[96px]">
        <PawIcon />
        <Text4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[95px] items-center justify-center left-[20px] top-[24px] w-[390px]" data-name="Container">
      <Button />
      <Container9 />
      <Container10 />
    </div>
  );
}

function EvolutionPapiCharacter() {
  return (
    <div className="relative shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] shrink-0 size-[312px]" data-name="EvolutionPapiCharacter">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgEvolutionPapiCharacter} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[312px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[54.5px] shadow-[0px_8px_48px_0px_rgba(0,0,0,0.12)] size-[312px] top-[30px]" data-name="Container">
      <EvolutionPapiCharacter />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[11px] left-[3.2px] top-[92px] w-[37.578px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">Hunger</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[14.395px] relative shrink-0 w-[6.48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.395px] relative w-[6.48px]">
        <p className="absolute font-['Nunito:ExtraBold',_sans-serif] font-extrabold leading-[13.333px] left-0 text-[10px] text-nowrap text-white top-[-1.08px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex from-[#ffb7c5] items-center justify-center left-[29.2px] opacity-[0.79] p-[2px] rounded-[3.35544e+07px] size-[21.601px] to-[#ff9db3] top-[-6.8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Text6 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white left-0 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] size-[44px] top-0" data-name="Button">
      <p className="absolute font-['Nunito:Regular',_sans-serif] font-normal leading-[32px] left-[5.52px] text-[#333333] text-[24px] text-nowrap top-[6px] whitespace-pre">🍖</p>
      <Container13 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[36px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p3e31ad00} id="Vector" opacity="0.3" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p3e31ad00} id="Vector_2" stroke="var(--stroke-0, #FFB7C5)" strokeDasharray="65.97 87.96" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[11px] left-[11.39px] top-[12.5px] w-[13.203px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">75</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute left-[4px] size-[36px] top-[50px]" data-name="Container">
      <Icon2 />
      <Text7 />
    </div>
  );
}

function StatusMeter() {
  return (
    <div className="h-[103px] relative shrink-0 w-[44px]" data-name="StatusMeter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[103px] relative w-[44px]">
        <Text5 />
        <Button1 />
        <Container14 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[11px] left-[12.72px] top-[92px] w-[18.563px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">Fun</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[14.395px] relative shrink-0 w-[6.48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.395px] relative w-[6.48px]">
        <p className="absolute font-['Nunito:ExtraBold',_sans-serif] font-extrabold leading-[13.333px] left-0 text-[10px] text-nowrap text-white top-[-1.08px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex from-[#ffb7c5] items-center justify-center left-[29.2px] opacity-[0.79] p-[2px] rounded-[3.35544e+07px] size-[21.601px] to-[#ff9db3] top-[-6.8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Text9 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white left-0 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] size-[44px] top-0" data-name="Button">
      <p className="absolute font-['Nunito:Regular',_sans-serif] font-normal leading-[32px] left-[5.52px] text-[#333333] text-[24px] text-nowrap top-[6px] whitespace-pre">🎾</p>
      <Container15 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[36px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p3e31ad00} id="Vector" opacity="0.3" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p3e31ad00} id="Vector_2" stroke="var(--stroke-0, #C8B8FF)" strokeDasharray="52.78 87.96" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[11px] left-[11.39px] top-[12.5px] w-[13.203px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">60</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute left-[4px] size-[36px] top-[50px]" data-name="Container">
      <Icon3 />
      <Text10 />
    </div>
  );
}

function StatusMeter1() {
  return (
    <div className="h-[103px] relative shrink-0 w-[44px]" data-name="StatusMeter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[103px] relative w-[44px]">
        <Text8 />
        <Button2 />
        <Container16 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[11px] left-[4.48px] top-[92px] w-[35.016px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">Energy</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] size-[44px] top-0" data-name="Button">
      <p className="font-['Nunito:Regular',_sans-serif] font-normal leading-[32px] relative shrink-0 text-[#333333] text-[24px] text-nowrap whitespace-pre">🌙</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[36px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p3e31ad00} id="Vector" opacity="0.3" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p3e31ad00} id="Vector_2" stroke="var(--stroke-0, #FFD66C)" strokeDasharray="74.77 87.96" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[11px] left-[11.39px] top-[12.5px] w-[13.203px]" data-name="Text">
      <p className="absolute font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[11px] left-0 text-[#333333] text-[11px] text-nowrap top-0 whitespace-pre">85</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute left-[4px] size-[36px] top-[50px]" data-name="Container">
      <Icon4 />
      <Text12 />
    </div>
  );
}

function StatusMeter2() {
  return (
    <div className="h-[103px] relative shrink-0 w-[44px]" data-name="StatusMeter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[103px] relative w-[44px]">
        <Text11 />
        <Button3 />
        <Container17 />
      </div>
    </div>
  );
}

function StatusIndicators() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[103px] items-center justify-center left-[101px] top-[332px] w-[228px]" data-name="StatusIndicators">
      <StatusMeter />
      <StatusMeter1 />
      <StatusMeter2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[4.17%_12.5%_12.5%_12.5%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
            <path d={svgPaths.p251b4300} fill="var(--fill-0, #333333)" id="Vector" />
          </svg>
        </div>
        <div className="absolute bottom-[41.67%] left-[33.33%] right-1/2 top-[41.67%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p3cbff000} fill="var(--fill-0, #333333)" id="Vector" />
          </svg>
        </div>
        <div className="absolute bottom-[41.67%] left-1/2 right-[33.33%] top-[41.67%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p3cbff000} fill="var(--fill-0, #333333)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ShopIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ShopIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative size-[18px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[32.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17.5px] items-center justify-center relative w-[32.969px]">
        <p className="font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[17.5px] relative shrink-0 text-[14px] text-black text-center text-nowrap whitespace-pre">Shop</p>
      </div>
    </div>
  );
}

function KawaiiButton() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#b8e3ff] grow h-[48px] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] shrink-0 to-[#9dd7f2]" data-name="KawaiiButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center relative w-full">
        <ShopIcon />
        <Text13 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[16.67%_16.67%_8.33%_8.33%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p1fc7b080} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FriendsIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="FriendsIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative size-[18px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[46.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17.5px] items-center justify-center relative w-[46.875px]">
        <p className="font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[17.5px] relative shrink-0 text-[14px] text-black text-center text-nowrap whitespace-pre">Friends</p>
      </div>
    </div>
  );
}

function KawaiiButton1() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#ffb7c5] grow h-[48px] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] shrink-0 to-[#ff9fb7]" data-name="KawaiiButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center relative w-full">
        <FriendsIcon />
        <Text14 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.333%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p347af900} fill="var(--fill-0, #333333)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MessageIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="MessageIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative size-[18px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[63.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17.5px] items-center justify-center relative w-[63.266px]">
        <p className="font-['Nunito:SemiBold',_sans-serif] font-semibold leading-[17.5px] relative shrink-0 text-[14px] text-black text-center text-nowrap whitespace-pre">Messages</p>
      </div>
    </div>
  );
}

function KawaiiButton2() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#c8b8ff] grow h-[48px] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] shrink-0 to-[#b8a6f3]" data-name="KawaiiButton">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center pl-[0.016px] pr-0 py-0 relative w-full">
          <MessageIcon />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center justify-center left-[20px] top-[451px] w-[390px]" data-name="Container">
      <KawaiiButton />
      <KawaiiButton1 />
      <KawaiiButton2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[523px] left-0 top-[339px] w-[430px]" data-name="Container">
      <Container12 />
      <StatusIndicators />
      <Container18 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20.625px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Nunito:Bold',_sans-serif] font-bold grow leading-[20.625px] min-h-px min-w-px relative shrink-0 text-[#333333] text-[15px] text-center">{`I'm Waiting for your Care 💛`}</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[17.875px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',_sans-serif] font-normal leading-[17.875px] left-[114.38px] text-[#666666] text-[11px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Tap an icon to feed or play!</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[44.5px] items-start left-[26px] top-[18px] w-[228px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M9.75 3.25L3.25 9.75" id="Vector" stroke="var(--stroke-0, #8E8E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M3.25 3.25L9.75 9.75" id="Vector_2" stroke="var(--stroke-0, #8E8E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] box-border content-stretch flex items-center justify-center left-[242px] p-[2px] rounded-[3.35544e+07px] size-[44px] top-[-6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#f0e7f7] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon8 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[80.5px] left-0 top-0 w-[280px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(240,231,247,0.6)] border-solid inset-0 pointer-events-none shadow-[0px_12px_32px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <Container20 />
      <Button4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-gradient-to-b from-[#fff8fc] left-[-12px] rounded-[3.35544e+07px] size-[20px] to-[#f7faff] top-[68.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(240,231,247,0.4)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-gradient-to-b from-[#fff8fc] left-[-4px] rounded-[3.35544e+07px] size-[12px] to-[#f7faff] top-[84.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(240,231,247,0.4)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function PapiSpeechBubble() {
  return (
    <div className="absolute h-[80.5px] left-[75px] top-[189.63px] w-[280px]" data-name="PapiSpeechBubble">
      <Container21 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-gradient-to-b from-[#ffb7c5] h-[44px] relative rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#ff9fb7] w-[81.266px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[81.266px]">
        <p className="absolute font-['Nunito:Bold',_sans-serif] font-bold leading-[16px] left-[12px] text-[12px] text-nowrap text-white top-[14px] whitespace-pre">+1K Steps</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#c8b8ff] grow min-h-px min-w-px relative rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#a99eff] w-[81.266px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[81.266px]">
        <p className="absolute font-['Nunito:Bold',_sans-serif] font-bold leading-[16px] left-[12px] text-[12px] text-nowrap text-white top-[14px] whitespace-pre">+5K Steps</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[96px] items-start left-[332.73px] top-[670px] w-[81.266px]" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function KawaiiHomeScreen() {
  return (
    <div className="absolute h-[862px] left-0 overflow-clip top-0 w-[430px]" data-name="KawaiiHomeScreen">
      <Container />
      <Container1 />
      <Container11 />
      <Container19 />
      <PapiSpeechBubble />
      <Container24 />
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#fff6e8] relative size-full" data-name="App">
      <KawaiiHomeScreen />
    </div>
  );
}