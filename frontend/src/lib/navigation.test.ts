import { appRoutes, getRouteMeta } from "@/lib/navigation"

describe("navigation metadata", () => {
  it("provides unique route hrefs for sidebar and homepage navigation", () => {
    const hrefs = appRoutes.map((route) => route.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it("resolves nested paths to their parent route metadata", () => {
    expect(getRouteMeta("/workspace/control-plane/services/details")).toMatchObject({
      href: "/workspace/control-plane/services",
      headerTitle: "Service Catalog",
    })
  })

  it("returns header metadata for newly covered top-level sections", () => {
    expect(getRouteMeta("/workspace")?.headerTitle).toBe("Mission Control")
    expect(getRouteMeta("/infrastructure")?.searchPlaceholder).toBe("Search regions, nodes, transports...")
    expect(getRouteMeta("/accounting")?.headerTitle).toBe("Accounting Department")
    expect(getRouteMeta("/settings")?.headerTitle).toBe("Settings")
  })
})
