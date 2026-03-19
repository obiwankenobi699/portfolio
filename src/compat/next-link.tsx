import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  replace?: boolean
}

const isExternalHref = (href: string) =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('mailto:') ||
  href.startsWith('tel:')

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, replace, ...props }, ref) => {
    if (isExternalHref(href)) {
      return (
        <a href={href} ref={ref} {...props}>
          {children}
        </a>
      )
    }

    return (
      <RouterLink to={href} replace={replace} ref={ref} {...props}>
        {children}
      </RouterLink>
    )
  },
)

Link.displayName = 'Link'

export default Link
