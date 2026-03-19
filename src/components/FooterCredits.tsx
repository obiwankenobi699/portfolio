import Image from 'next/image'

export default function FooterCredits() {
  return (
    <footer className="sm:px-8 px-4 py-3 sm:py-4">
      <div className="flex items-center justify-center">
        <Image
          src="/footer.png"
          alt="Footer credits"
          width={900}
          height={200}
          className="w-full max-w-2xl h-auto opacity-95"
          sizes="(max-width: 640px) 100vw, 640px"
          priority={false}
        />
      </div>
    </footer>
  )
}
