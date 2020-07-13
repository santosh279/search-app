import * as helpers from "./searchbar-method";

jest.useFakeTimers();


describe("Test searchbar helper methods", () => {
  it("should test the trimDetails method if text count greater than the count ", () => {
    const sampleText = `A function to advance timers was called but the timers API is no
    t mocked with fake timers. Call in this test or enable fake timers globally by setting`
    const result = helpers.trimDetails(sampleText, 70);
    expect(result).toEqual(`A function to advance timers was called but the timers API is no
    t...`)
  })

  it("should test the trimDetails method if text count less than the count ", () => {
    const sampleText = `A function to advance timers was called but the timers`
    const result = helpers.trimDetails(sampleText, 70);
    expect(result).toEqual(`A function to advance timers was called but the timers`)
  })

  it("should test the debounce function", () => {
    let test = jest.fn()
    const result = helpers.debounce(test, 500);
    result();
    result();

    jest.runAllTimers();
 
    expect(test).toHaveBeenCalledTimes(1);
  
  })
})