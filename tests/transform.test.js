const transformToJSON = require("../src/transform/transform");

test("should transform event data correctly", () => {
  const input =
    "|2054|create|event|1497359166352|event-id|Football|Sky Bet League Two|\\|Match Name\\||1497359216693|0|1|";
  const output = transformToJSON(input);

  expect(output).toEqual({
    header: {
      msgId: "2054",
      operation: "create",
      type: "event",
      timestamp: "1497359166352",
    },
    body: {
      eventId: "event-id",
      category: "Football",
      subCategory: "Sky Bet League Two",
      name: "Match Name",
      startTime: "1497359216693",
      displayed: false,
      suspended: true,
    },
  });
});

test("should transform market data correctly", () => {
  const input =
    "|2055|create|market|1497359166353|market-id|event-id|\\|Full Time Result\\||0|1|";
  const output = transformToJSON(input);
  expect(output).toEqual({
    header: {
      msgId: "2055",
      operation: "create",
      type: "market",
      timestamp: "1497359166353",
    },
    body: {
      marketId: "market-id",
      eventId: "event-id",
      name: "Full Time Result",
      displayed: false,
      suspended: true,
    },
  });
});

test("should transform outcome data correctly", () => {
  const input =
    "|2056|create|outcome|1497359166354|outcome-id|market-id|\\|Team A Wins\\||5/2|0|1|";
  const output = transformToJSON(input);

  expect(output).toEqual({
    header: {
      msgId: "2056",
      operation: "create",
      type: "outcome",
      timestamp: "1497359166354",
    },
    body: {
      outcomeId: "outcome-id",
      marketId: "market-id",
      name: "Team A Wins",
      price: "5/2",
      displayed: false,
      suspended: true,
    },
  });
});
