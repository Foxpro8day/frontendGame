const checkValidateTicket = (confirmSelected, ticket) => {
  // Danh sách các hàm kiểm tra cho từng loại cược
  const checkers = {
    Lo2so: CheckLo2so,
    Dedau: CheckDedau,
    DeDB: CheckDeDB,
  };

  // Kiểm tra từng loại cược trong vé
  for (const caseSelected of Object.keys(checkers)) {
    const relevantTickets = ticket.filter(
      (tickets) => tickets.caseSelected === caseSelected
    );

    // Nếu có vé thuộc loại này, gọi hàm kiểm tra
    if (
      relevantTickets.length > 0 &&
      !checkers[caseSelected](confirmSelected, relevantTickets)
    ) {
      return false; // Nếu bất kỳ kiểm tra nào không hợp lệ, trả về false
    }
  }

  return true; // Tất cả các kiểm tra đều hợp lệ
};

// Các hàm kiểm tra chi tiết
const CheckLo2so = (confirmSelected, ticket) => {
  const lo2soConfirm = confirmSelected.filter(
    (tickets) => tickets.caseSelected === "Lo2so"
  );
  const lo2soCurrent = ticket.filter(
    (tickets) => tickets.caseSelected === "Lo2so"
  );

  // Tính tổng số lượng các numbers
  const totalNumbersConfirm = lo2soConfirm.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );
  const totalNumbersCurrent = lo2soCurrent.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );

  // Kiểm tra tổng số lượng numbers
  return totalNumbersConfirm + totalNumbersCurrent <= 10;
};

const CheckDedau = (confirmSelected, ticket) => {
  const dedauConfirm = confirmSelected.filter(
    (tickets) => tickets.caseSelected === "Dedau"
  );
  const dedauCurrent = ticket.filter(
    (tickets) => tickets.caseSelected === "Dedau"
  );

  // Tính tổng số lượng các numbers
  const totalNumbersConfirm = dedauConfirm.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );
  const totalNumbersCurrent = dedauCurrent.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );

  // Kiểm tra tổng số lượng numbers
  return totalNumbersConfirm + totalNumbersCurrent <= 10;
};

const CheckDeDB = (confirmSelected, ticket) => {
  const deDBConfirm = confirmSelected.filter(
    (tickets) => tickets.caseSelected === "DeDB"
  );
  const deDBCurrent = ticket.filter(
    (tickets) => tickets.caseSelected === "DeDB"
  );

  // Tính tổng số lượng các numbers
  const totalNumbersConfirm = deDBConfirm.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );
  const totalNumbersCurrent = deDBCurrent.reduce(
    (total, tickets) => total + tickets.numbers.length,
    0
  );

  // Kiểm tra tổng số lượng numbers
  return totalNumbersConfirm + totalNumbersCurrent <= 10;
};




export {
  checkValidateTicket,
  CheckLo2so,
  CheckDedau,
  CheckDeDB,
};
