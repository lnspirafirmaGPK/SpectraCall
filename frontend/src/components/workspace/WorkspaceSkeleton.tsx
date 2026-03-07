import { Skeleton } from "@/components/ui/skeleton"

export function WorkspaceSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
      {/* Header Section Skeleton */}
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-64 lg:w-96" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </section>

      {/* Content Grid Skeleton */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Approval Queue Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
            <div className="mb-6 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-lg" />
              ))}
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          </div>

          {/* System Topology Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* AI Recommendations Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Active Alerts Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
