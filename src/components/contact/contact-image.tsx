export function ContactImage() {
  const imageAlt = 'Contact'
  const imageUrl = '/contact/dialing.gif'

  return (
    <div className="relative h-[500px] animate-fade-in-left overflow-hidden rounded-lg shadow-lg">
      <img
        alt={imageAlt}
        className="object-cover transition-transform duration-700 hover:scale-105 w-full h-full"
        src={imageUrl}
      />
    </div>
  )
}
