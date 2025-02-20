const ResultCalc = (confirmSelected, newStations) => {
  // last2digits, last3digits, motHcDb, motHdvDb, haisg7, haiscDB, baDB

  const specialPrize = newStations[0]?.gdb?.[0]; // giải đb
  const giai7 = newStations[0]?.g7 || []; // toàn bộ giải 7 (4 giải)
  const tensDb = specialPrize.charAt(3); // Nếu tồn tại, mới gọi charAt
  const unitsDb = specialPrize.charAt(4); // Chữ số hàng đơn vị giải đặc biệt
  const last2digitsDB = specialPrize.slice(-2); // 2 chữ số cuối giải đặc biệt
  const last3digitsDB = specialPrize.slice(-3);
  const allPrices = newStations;
  const winningResults = [];

  // tất cả các giải dàn đều
  const allNumbers2Digits = newStations.flatMap((station) => [
    ...(station.g7 || []),
    ...(station.g6 || []),
    ...(station.g5 || []),
    ...(station.g4 || []),
    ...(station.g3 || []),
    ...(station.g2 || []),
    ...(station.g1 || []),
    ...(station.gdb || []),
  ]);

  // tất cả các giải có 3 số cuối dàn đều
  const allNumbers3Digits = newStations.flatMap((station) => [
    ...(station.g6 || []),
    ...(station.g5 || []),
    ...(station.g4 || []),
    ...(station.g3 || []),
    ...(station.g2 || []),
    ...(station.g1 || []),
    ...(station.gdb || []),
  ]);

  const last2digits = allNumbers2Digits.map((num) => num.slice(-2)); // set 2 chữ số cuối của tất cả các giải
  const last3digits = allNumbers3Digits.map((num) => num.slice(-3)); // 2 chữ số cuối của tất cả các giải


  const checkWin = () => {
    let isWinner = false;
    const winningResults = [];
    confirmSelected.forEach(({ caseSelected, numbers }) => {
      const winningNumbers = [];
      switch (caseSelected) {
        case "Lo2so":
          numbers.forEach((num) => {
            if (last2digits.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "Lo3so":
          numbers.forEach((num) => {
            if (last3digits.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "Xien2so":
          if (
            numbers.length === 2 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Xien3so":
          if (
            numbers.length === 3 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Xien4so":
          if (
            numbers.length === 4 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Truot4so":
          if (
            numbers.length === 4 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => !last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Truot8so":
          if (
            numbers.length === 8 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => !last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Truot10so":
          if (
            numbers.length === 8 && // Đảm bảo có đúng 2 số trong dãy
            numbers.every((num) => !last2digits.includes(num)) // Kiểm tra mọi số đều có trong last2digits
          ) {
            isWinner = true;
            winningNumbers.push(numbers);
          }
          break;
        case "Dau":
          numbers.forEach((num) => {
            if (tensDb.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "Duoi":
          numbers.forEach((num) => {
            if (unitsDb.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "Dedau":
          numbers.forEach((num) => {
            if (giai7.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "DeDB":
          numbers.forEach((num) => {
            if (last2digitsDB.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        case "Bacang":
          numbers.forEach((num) => {
            if (last3digitsDB.includes(num)) {
              isWinner = true;
              winningNumbers.push(num);
            }
          });
          break;
        default:
          break;
      }
      if (winningNumbers.length > 0) {
        // Nếu có số trúng, thêm vào mảng kết quả
        winningResults.push({ caseSelected, winningNumbers });
      }
    });
    return { isWinner, winningResults };
  };

  // console.log("last2digits", last2digits);
  // console.log("last3digits", last3digits);
  // console.log("tensDb", tensDb);
  // console.log("unitsDb", unitsDb);
  // console.log("giai7", giai7);
  // console.log("last2digitsDB", last2digitsDB);
  // console.log("last3digitsDB", last3digitsDB);

  return {
    checkWin,
    allPrices,
    last2digits,
    last3digits,
    tensDb,
    unitsDb,
    giai7,
    last2digitsDB,
    last3digitsDB,
  };
};

export default ResultCalc;
