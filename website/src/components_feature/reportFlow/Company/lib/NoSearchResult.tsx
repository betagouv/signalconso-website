export function NoSearchResult({text}: {text: string}) {
  return (
    <div className="flex items-center text-center justify-center mb-8">
      <div>
        <div className="h-[110px] mt-2 leading-4 text-gray-400">
          <i className="ri-emotion-normal-line sc-icon-xxl" />
        </div>
        <div className="mt-2">
          <span className="text-xl text-gray-600">{text}</span>
        </div>
      </div>
    </div>
  )
}
