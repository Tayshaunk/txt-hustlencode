

export const SANITIZE_ATTRIBUTES = {
  img: ['class', 'id', 'src', 'alt'],
  div: ['class', 'id'],
  p: ['class', 'id'],
  span: [],
  a: ['href', 'target'],
}

export const SANITIZE_TAGS = [
  'img',
  'div',
  'p',
  'br',
  'ul',
  'li',
  'h1',
  'strong',
  'em',
  'del',
  'ins',
  'span',
  'a',
  'ol',
  'br',
  'style'
]

export const SANITIZE_CLOSING = [
  'img',
  'br',
  'hr',
  'area',
  'base',
  'basefont',
  'input',
  'link',
  'meta',
]
