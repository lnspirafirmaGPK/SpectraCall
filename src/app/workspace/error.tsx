"use client"

import { useEffect } from "react"

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <h2 className="text-xl font-bold text-red-500">เกิดข้อผิดพลาดใน Mission Control</h2>
      <p className="max-w-lg text-sm text-slate-500 dark:text-slate-400">ไม่สามารถแสดงผลหน้าได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง</p>
      <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
        Try again
      </button>
    </div>
  )
}
