import { useEffect, useState } from "react"

const Dates = () => {
  const [dates, setDates] = useState({
    text: new Date().toString(),
    utc: new Date().toUTCString(),
    iso: new Date().toISOString(),
  })

  useEffect(() => {
    setInterval(
      () =>
        setDates({
          text: new Date().toString(),
          utc: new Date().toUTCString(),
          iso: new Date().toISOString(),
        }),
      1000
    )
  }, [])

  useEffect(() => {
    document.getElementById("date-text")!.textContent = dates.text
    document.getElementById("date-utc")!.textContent = dates.utc
    document.getElementById("date-iso")!.textContent = dates.iso
    document.getElementById("date-locale-date")!.textContent = new Date(
      dates.utc
    ).toLocaleString()
    document.getElementById("date-locale-24h")!.textContent = new Date(
      dates.utc
    ).toLocaleString("en-US", { hour12: false })
  }, [dates])

  const copyDate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const div = e.currentTarget as HTMLDivElement
    const copAlertDiv = document.getElementById("copy-alert")!

    navigator.clipboard.writeText(
      div.lastElementChild?.firstElementChild?.textContent!
    )

    copAlertDiv.classList.remove("alert-up")
    // Not sure about performance
    void copAlertDiv.offsetWidth
    copAlertDiv.classList.add("alert-up")
  }

  return (
    <div className="relative box-border flex max-h-max min-h-full w-full flex-col gap-3 overflow-hidden p-4">
      <div className="cursor-pointer" onClick={copyDate}>
        <h1>TEXT</h1>
        <div className="flex items-center">
          <code id="date-text" className="text-lg" />
        </div>
      </div>

      <div className="cursor-pointer" onClick={copyDate}>
        <h1 className="mt-4">UTC</h1>
        <div className="flex items-center">
          <code id="date-utc" className="text-lg" />
        </div>
      </div>

      <div className="cursor-pointer" onClick={copyDate}>
        <h1 className="mt-4">ISO</h1>
        <div className="flex items-center">
          <code id="date-iso" className="text-lg" />
        </div>
      </div>

      <div className="cursor-pointer" onClick={copyDate}>
        <h1 className="mt-4">LOCALE</h1>
        <div className="grid items-center">
          <code id="date-locale-date" className="text-lg" />
        </div>
      </div>

      <div className="cursor-pointer" onClick={copyDate}>
        <h1 className="mt-4">24h</h1>
        <div className="grid items-center">
          <code id="date-locale-24h" className="text-lg" />
        </div>
      </div>

      <div
        id="copy-alert"
        className="absolute bottom-0 select-none self-center bg-theme-on-background px-4 py-2 font-bold text-theme-background opacity-0">
        Copied!
      </div>
    </div>
  )
}

export default Dates
