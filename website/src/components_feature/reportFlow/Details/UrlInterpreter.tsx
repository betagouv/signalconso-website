// Try to find raw URL in the string, and wrap them with an actual link
// Strictly for one use case where we link to bonial.fr
export function UrlInterpreter({children}: {children: string}) {
  const urlRegex = /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g
  const processedContent = children.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a href={part} key={index} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    }
    return <span key={index}>{part}</span>
  })
  return <>{processedContent}</>
}
