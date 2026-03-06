import { cn } from "./utils"

describe("cn", () => {
  it("should merge class names correctly", () => {
    expect(cn("a", "b")).toBe("a b")
    expect(cn("a", { b: true, c: false })).toBe("a b")
    expect(cn(["a", "b"], "c")).toBe("a b c")
    expect(cn("a", null, undefined, false, "b")).toBe("a b")
  })

  it("should handle empty inputs", () => {
    expect(cn()).toBe("")
    expect(cn(null, undefined, false)).toBe("")
  })

  it("should handle nested arrays", () => {
    expect(cn(["a", ["b", "c"]], "d")).toBe("a b c d")
  })
})
