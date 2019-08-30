import Typography from 'typography'
import WPTheme from 'typography-theme-wordpress-2012'

const typography = new Typography(WPTheme)

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography