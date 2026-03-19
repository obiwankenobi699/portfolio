type FontOptions = {
  variable?: string
}

type FontResult = {
  className: string
  variable: string
}

const loadFonts = () => {
  if (typeof document === 'undefined') {
    return
  }
  if (document.getElementById('google-fonts-compat')) {
    return
  }
  const link = document.createElement('link')
  link.id = 'google-fonts-compat'
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400&family=Pixelify+Sans:wght@400&display=swap'
  document.head.appendChild(link)
}

const createFont = (options?: FontOptions): FontResult => {
  loadFonts()
  return {
    className: '',
    variable: options?.variable ?? '',
  }
}

export const Instrument_Serif = (options?: FontOptions) => createFont(options)
export const Montserrat = (options?: FontOptions) => createFont(options)
export const Pixelify_Sans = (options?: FontOptions) => createFont(options)
