import { useLocation, useNavigate } from 'react-router-dom'

export const usePathname = () => {
  const location = useLocation()
  return location.pathname
}

export const useRouter = () => {
  const navigate = useNavigate()
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
  }
}

export const notFound = () => {
  throw new Error('Not Found')
}
