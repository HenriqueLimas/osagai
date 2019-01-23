import attachShadow, { SHADOW_DOM } from "./attachShadow";

describe("attachShadow()", () => {
  it("should call the attachShadow method of the element with default mode", () => {
    const elm = { attachShadow: jest.fn() };

    attachShadow(elm);

    expect(elm.attachShadow).toHaveBeenCalledWith({ mode: "open" });
  });

  it("should call the attachShadow with passed shadowRootInit", () => {
    const elm = { attachShadow: jest.fn() };

    attachShadow(elm, { mode: "closed" });

    expect(elm.attachShadow).toHaveBeenCalledWith({ mode: "closed" });
  });

  it("should set the shadowDom property", () => {
    const root = { id: "I am the root" };
    const elm = { attachShadow: jest.fn().mockReturnValue(root) };

    attachShadow(elm);

    expect(elm[SHADOW_DOM]).toBe(root);
  });
});