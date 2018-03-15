import { getTheme, defaultThemeVariables } from '@shoutem/ui'
import colors from './colors'

const themeVariables = {
  ...defaultThemeVariables,
  backgroundColor: colors.black,
  navBarIconsColor: 'white',
  text: {
    ...defaultThemeVariables.text,
    color: colors.grey100,
  },
  paperColor: colors.grey900,
  navBarBorderColor: colors.grey600,
  featuredNavBarIconsColor: 'white',
  subtitle: {
    ...defaultThemeVariables.subtitle,
    color: colors.grey200,
  },
  title: {
    ...defaultThemeVariables.title,
    color: colors.grey100,
  },
  lineColor: colors.grey600,
  tagOverlayTextColor: colors.grey100,
  imageOverlayTextColor: 'white',
  primaryButtonText: {
    ...defaultThemeVariables.primaryButtonText,
    color: colors.grey900,
  },

  navBarText: {
    color: colors.color50,
  },
  navBarBackground: colors.grey900,

  // featuredColor: '#659CEC',
  // shadowColor: 'rgba(0, 0, 0, 0.1)',
  //
  // heading: {
  //   color: '#222222',
  // },
  //
  // caption: {
  //   color: '#666666',
  // },
  //
  // imageOverlayColor: 'rgba(0, 0, 0, 0.2)',
  // tagOverlayColor: 'rgba(0, 0, 0, 0.7)',
  //

  //
  // featuredNavBarTitleColor: '#ffffff',
  //
  // mainNavBackground: '#FFFFFF',
  // mainNavItemColor: 'rgba(50, 50, 50, 0.4)',
  // mainNavItemBackground: 'rgba(0, 0, 0, 0)',
  // mainNavSelectedItemBackground: '#FFFFFF',
  // mainNavSelectedItemColor: '#222222',
  // mainNavSelectedItemBorderColor: '#659CEC',
  // mainNavBorderColor: '#e0e0e0',
  //
  // subNavItemColor: '#666666',
  // subNavItemBackground: 'rgba(0, 0, 0, 0)',
  // subNavListBorderColor: '#e0e0e0',
  //
  // primaryButtonBackgroundColor: '#ffffff',
  // primaryButtonBorderColor: '#ffffff',
  // secondaryButtonTextColor: '#ffffff',
  // secondaryButtonBackgroundColor: '#2c2c2c',
  // secondaryButtonBorderColor: '#2c2c2c',
  //
  // sectionHeaderBackgroundColor: '#F2F2F2',
  // indicatorColor: '#222222',
}

export default getTheme(themeVariables)
// export default getTheme(defaultThemeVariables)
