import { COLORS } from './constants'
import { getFontSizes } from './themeUtils'

export const variables = {
  color: '#000',
  bgColor: COLORS.white,
  primaryColor: '#171C8F',
  secondaryColor: '#292a40',
  textColor: COLORS.primaryGray,
  dashboardBg: COLORS.secondaryGray,
}

export const fontSizes = getFontSizes()

export default {
  fontSizes,
}
