require = require("esm")(module); // eslint-disable-line

const firestore = require("../lib/firestore");
firestore.authenticate = jest
  .fn(() => "default")
  .mockImplementation(() => {
    return true;
  });

const { chartSize } = require("../main");

test("renders the chart", async () => {
  const request = { query: { repo: "size" } };
  const response = {};

  response.status = () => {
    return true;
  };
  response.send = data => {
    // expect to receive a chart object back
    const found = data.indexOf("new Chart(ctx, obj)");

    let result = false;

    if (found !== -1) {
      result = true;
    }

    expect(result).toEqual(true);
  };
  try {
    await chartSize(request, response);
  } catch (e) {
    console.log(e.message);
  }
});
