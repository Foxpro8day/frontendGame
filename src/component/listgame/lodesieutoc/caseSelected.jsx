import {
  BacangText,
  BacangTextImg,
  BaoloText,
  DanhdeText,
  DauduoiText,
  DauTextImg,
  DeDauTextImg,
  DeDBTextImg,
  DuoiTextImg,
  Lo2soTextImg,
  Lo3soTextImg,
  LotruotText,
  LoxienText,
  MainTab1,
  MainTab1Selected,
  MainTab2,
  MainTab2Selected,
  MainTab3,
  MainTab3Selected,
  Truot10soTextImg,
  Truot4soTextImg,
  Truot8soTextImg,
  Xien2soTextImg,
  Xien3soTextImg,
  Xien4soTextImg,
} from "../../graphic/gLode";
import "./caseSelected.scss";

const CaseSelected = ({ stage, caseSelected, handleItemClick }) => {
  switch (caseSelected) {
    case "Lo2so":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Lo2soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <Lo3soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo3so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Lo3so":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Lo2soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <Lo3soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo3so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Xien2so":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Xien2soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <Xien3soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien3so")}
          />
          <Xien4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien4so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Xien3so":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Xien2soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <Xien3soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien3so")}
          />
          <Xien4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien4so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Xien4so":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Xien2soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <Xien3soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien3so")}
          />
          <Xien4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien4so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Truot4so":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Truot4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <Truot8soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot8so")}
          />
          <Truot10soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot10so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Truot8so":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Truot4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <Truot8soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot8so")}
          />
          <Truot10soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot10so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Truot10so":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab3Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Truot4soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <Truot8soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot8so")}
          />
          <Truot10soTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot10so")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Dau":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <DauTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DuoiTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Duoi")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Duoi":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <DauTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DuoiTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Duoi")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Dedau":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <DeDauTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <DeDBTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("DeDB")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "DeDB":
      return (
        <>
          <MainTab1
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <DeDauTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <DeDBTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("DeDB")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    case "Bacang":
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <BacangTextImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
          <BaoloText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Lo2so")}
          />
          <LoxienText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Xien2so")}
          />
          <LotruotText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Truot4so")}
          />
          <DauduoiText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dau")}
          />
          <DanhdeText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Dedau")}
          />
          <BacangText
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            onClick={() => handleItemClick("Bacang")}
          />
        </>
      );
    default:
      return (
        <>
          <MainTab1Selected
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <MainTab2
            className={stage === "result" || stage === "finish" ? "cover" : ""}
          />
          <Lo2soTextImg onClick={() => handleItemClick("Lo2so")} />
          <Lo3soTextImg onClick={() => handleItemClick("Lo3so")} />
          <BaoloText onClick={() => handleItemClick("Lo2so")} />
          <LoxienText onClick={() => handleItemClick("Xien2so")} />
          <LotruotText onClick={() => handleItemClick("Truot4so")} />
          <DauduoiText onClick={() => handleItemClick("Dau")} />
          <DanhdeText onClick={() => handleItemClick("Dedau")} />
          <BacangText onClick={() => handleItemClick("Bacang")} />
        </>
      );
  }
};

export default CaseSelected;
