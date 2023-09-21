function transformToJSON(data) {
  // 1. Temporarily replace the escaped pipes with a placeholder
  const tempData = data.replace(/\\\|/g, "@@ESCAPED_PIPE@@");

  // 2. Split by pipe
  let dataArray = tempData.split("|").slice(1, -1);

  // 3. Replace the placeholder back to escaped pipe
  dataArray = dataArray.map((field) => field.replace(/@@ESCAPED_PIPE@@/g, "|"));

  const header = {
    msgId: dataArray[0],
    operation: dataArray[1],
    type: dataArray[2],
    timestamp: dataArray[3],
  };

  let body = {};

  switch (header.type) {
    case "event":
      body = {
        eventId: dataArray[4] || "",
        category: dataArray[5] || "",
        subCategory: dataArray[6] || "",
        name: dataArray[7] ? dataArray[7].replace(/\|/g, "") : "",
        startTime: dataArray[8] || "",
        displayed: dataArray[9] ? dataArray[9] === "1" : undefined,
        suspended: dataArray[10] ? dataArray[10] === "1" : undefined,
      };
      break;
    case "market":
      body = {
        marketId: dataArray[4] || "",
        eventId: dataArray[5] || "",
        name: dataArray[6] ? dataArray[6].replace(/\|/g, "") : "",
        displayed: dataArray[7] ? dataArray[7] === "1" : undefined,
        suspended: dataArray[8] ? dataArray[8] === "1" : undefined,
      };
      break;
    case "outcome":
      body = {
        outcomeId: dataArray[4] || "",
        marketId: dataArray[5] || "",
        name: dataArray[6] ? dataArray[6].replace(/\|/g, "") : "",
        price: dataArray[7] || "",
        displayed: dataArray[8] ? dataArray[8] === "1" : undefined,
        suspended: dataArray[9] ? dataArray[9] === "1" : undefined,
      };
      break;
    default:
      console.warn(
        `Received unexpected packet type: ${header.type}. Data: ${data}`
      );
      body = dataArray.slice(4);
      break;
  }

  return {
    header,
    body,
  };
}

module.exports = transformToJSON;
