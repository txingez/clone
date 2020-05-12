export function convertMedia(value) {
  switch (value) {
    case "YAHOO":
      return "YDN"
    case "NEW LINE":
      return "NAP"
    case 'FACEBOOK':
      return "FACEBOOK"
    case 'TWITTER':
      return 'TWITTER'
    default:
      return "UNKNOW"
  }
}

