import { cyan, green, orange, red } from '@mui/material/colors';

export const appDimensions = {
	topNavigationHeight: 60,
	leftSideDrawerWidth: 240,
};

export const appColorPalette = {
	black: '#000000',
	blue: '#7790BF',
	lightBlue: '#65B0E2',
	white: '#EFEFEF',
	grey: '#D4D4D8',
	green: green[400],
	paperLight: '#EBEBEB',
	paperLightContrast: '#E0E0E0',
	paperDark: '#414755',
	paperDarker: '#4A4549',
	paperDarkContrast: '#756C73',
};

export const customCesiumColor = {
	pointEntityColors: {
		green: '#66BB6A',
		orange: orange[500],
		red: '#EF5350',
		yellow: '#FFEE58',
	},
	polylineColors: {
		green: '#66BB6A',
		grey: '#90A4AE',
		red: '#EF5350',
		purple: '#9575CD',
		yellow: '#FFEE58',
	},
	ellipseColors: {
		pink: '#E305FA',
	},
};

const palette = {
	light: {
		primary: {
			main: '#7790BF',
			light: '#7790BF',
			dark: '#1F3E74',
			contrastText: '#ABABAC',
		},
		secondary: {
			main: '#0E4EA1',
			light: '#1470e7',
			dark: '#0a3772',
			contrastText: '#000',
		},
		background: {
			default: appColorPalette.paperLightContrast,
			paper: appColorPalette.paperLight,
		},
		text: {
			primary: '#000',
			secondary: appColorPalette.white,
			accent: '#464646',
		},
		accent: {
			info: cyan[700],
			success: green[600],
			warning: orange[500],
			error: red[600],
		},
	},
	dark: {
		primary: {
			main: '#516E9F',
			light: '#898A8C',
			dark: '#090F09',
			contrastText: '#898A8C',
		},
		secondary: {
			main: '#87F5FB',
			light: '#516E9F',
			dark: '#051B42',
			contrastText: '#000',
		},
		background: {
			default: appColorPalette.paperDarker,
			paper:  appColorPalette.paperDark,
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#D4D5D6',
			accent: '#83878F',
		},
		accent: {
			info: '#87F5FB',
			success: green[400],
			warning: orange[500],
			error: red[500],
		},
	},
};

export const getDesignTokens = (mode: any) => ({
	breakpoints: {
		values: {
			xs: 0, // mobile
			sm: 600, // tablet
			md: 900, // laptop
			lg: 1200, // desktop
			xl: 1536, // large desktop
		},
	},
	typography: {
		fontFamily: ['Lato', 'Arial', 'sans-serif'].join(','),
		// components: {
		// 	MuiCssBaseline: {
		// 		styleOverrides: `
		// 		@font-face {
		// 			font-display: swap;
		// 			font-family: 'Lato';
		// 			font-style: normal;
		// 			font-weight: 900;
		// 			src:
		// 				url('../assets/fonts/lato-v24-latin-900.woff2') format('woff2'),
		// 				url('../assets/fonts/lato-v24-latin-900.ttf') format('truetype');
		// 		}
		// 		`,
		// 	},
		// },
		h1: {
			fontSize: '6rem',
			fontWeight: '300',
			lineHeight: '1.167',
			letterSpacing: '-0.01562em',
			marginBottom: '0.35em'
		},
		h2: {
			fontSize: '3.75rem',
			fontWeight: '300',
			lineHeight: '1.2',
			letterSpacing: '-0.00833em',
			marginBottom: '0.35em'
		},
		h3: {
			fontSize: '3rem',
			fontWeight: '400',
			lineHeight: '1.167',
			letterSpacing: '0em',
			marginBottom: '0.35em'
		},
		h4: {
			fontSize: '2.125rem',
			fontWeight: '400',
			lineHeight: '1.235',
			letterSpacing: '0.00735em',
			marginBottom: '0.35em'
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: '400',
			lineHeight: '1.334',
			letterSpacing: '0em',
			marginBottom: '0.35em'
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: '500',
			lineHeight: '1.6',
			letterSpacing: '0.0075em',
			marginBottom: '0.35em'
		},
		body1: {
			fontSize: '1rem',
			fontWeight: '400',
			lineHeight: '1.5',
			letterSpacing: '0.00938em',
			marginBottom: '0.35em'
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: '400',
			lineHeight: '1.43',
			letterSpacing: '0.01071em',
			marginBottom: '0.35em'
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: '400',
			lineHeight: '1.75',
			letterSpacing: '0.00938em',
			marginBottom: '0.35em'
		},
		subtitle2: {
			fontSize: '0.875rem',
			fontWeight: '500',
			lineHeight: '1.57',
			letterSpacing: '0.00714em',
			marginBottom: '0.35em'
		},
		button :{
			fontSize: '0.875rem',
			fontWeight: '500',
			lineHeight: '1.75',
			letterSpacing: '0.02857em',
			marginBottom: '0.35em'
		},
		caption: {
			fontSize: '0.75rem',
			fontWeight: '400',
			lineHeight: '1.66',
			letterSpacing: '0.03333em',
			marginBottom: '0.35em'
		},
		overline: {
			fontSize: '0.75rem',
			fontWeight: '400',
			lineHeight: '2.66',
			letterSpacing: '0.08333em',
			marginBottom: '0.35em'
		}
	},
	palette: {
		mode,
		...(mode === 'light'
			? {
					// ! LIGHT MODE COLOR PALETTE
					primary: {
						main: palette.light.primary.main,
						light: palette.light.primary.light,
						dark: palette.light.primary.dark,
						contrastText: palette.light.primary.contrastText,
					},
					secondary: {
						main: palette.light.secondary.main,
						light: palette.light.secondary.light,
						dark: palette.light.secondary.dark,
						contrastText: palette.light.secondary.contrastText,
					},
					background: {
						default: palette.light.background.default,
						paper: palette.light.background.paper,
					},
					text: {
						primary: palette.light.text.primary,
						secondary: palette.light.text.secondary,
					},
					info: {
						main: palette.light.accent.info,
					},
					success: {
						main: palette.light.accent.success,
					},
					warning: {
						main: palette.light.accent.warning,
					},
					error: {
						main: palette.light.accent.error,
					},
			}
			: {
					// ! DARK MODE COLOR PALETTE
					primary: {
						main: palette.dark.primary.main,
						light: palette.dark.primary.light,
						dark: palette.dark.primary.dark,
						contrastText: palette.dark.primary.contrastText,
					},
					secondary: {
						main: palette.dark.secondary.main,
						light: palette.dark.secondary.light,
						dark: palette.dark.secondary.dark,
						contrastText: palette.dark.secondary.contrastText,
					},
					background: {
						default: palette.dark.background.default,
						paper: palette.dark.background.paper,
					},
					text: {
						primary: palette.dark.text.primary,
						secondary: palette.dark.text.secondary,
					},
					info: {
						main: palette.dark.accent.info,
					},
					success: {
						main: palette.dark.accent.success,
					},
					warning: {
						main: palette.dark.accent.warning,
					},
					error: {
						main: palette.dark.accent.error,
					},
			}),
	},
});

export const getThemedComponents = (mode: any) => ({
	components: {
		...(mode === 'light'
			? {
					// ! LIGHT MODE THEME COMPONENTS
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: 4,
								// color: palette.light.text.primary,
								borderWidth: 2,
								'&:hover': {
									borderWidth: 2,
								},
							},
						},
						variants: [
							{
								props: { variant: 'contained' },
								style: {
									color: palette.light.text.secondary,
								},
							},
							{
								props: { variant: 'outlined' },
								style: {
									color: palette.light.primary.main,
								},
							},
							{
								props: { variant: 'primary', color: 'primary' },
								style: {
									border: '4px dashed blue',
								},
							},
						],
					},
					MuiDataGrid: {
						styleOverrides: {
							root: {
								backgroundColor: appColorPalette.paperLight,
							},
						},
					},
					MuiInput: {
						styleOverrides: {
							root: {
								color: appColorPalette.blue,
							},
						},
					},
					MuiLink: {
						styleOverrides: {
							root: {
								color: appColorPalette.blue,
								fontWeight: 600
							},
						},
					},
					MuiListItemText: {
						styleOverrides: {
							primary: {
								fontSize: '1rem',
								color: palette.light.text.secondary,
							},
							secondary: {
								fontSize: '0.8rem',
								color: palette.light.text.secondary,
							},
						},
					},
					MuiList: {
						styleOverrides: {
							root: {
								color: palette.light.text.secondary,
							},
						},
					},
					MuiPagination: {
						styleOverrides: {
							root: {
								button: {
									color: palette.light.text.secondary,
									'&.Mui-selected': {
										backgroundColor: palette.light.primary.main,
										'&:hover': {
											backgroundColor: palette.light.accent.info,
										},
									},
									'&:hover': {
										backgroundColor: palette.light.accent.info,
									},
								},
							},
						},
					},
					MuiPaper: {
						styleOverrides: {
							root: {
								backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))'
							},
						},
					},
					MuiTab: {
						styleOverrides: {
							root: {
								color: palette.light.text.accent,
							},
						},
					},
					MuiTableCell: {
						styleOverrides: {
							head: {
								button: {
									color: appColorPalette.black,
									fontWeight: 'bold',
								},
								div: {
									color: appColorPalette.black,
									fontWeight: 'bold',
									textTransform: 'uppercase',
								},
							},
						},
					},
					MuiTablePagination: {
						styleOverrides: {
							root: {
								color: palette.light.text.secondary,
							},
						},
					},
					MuiToolbar: {
						styleOverrides: {
							root: {
								backgroundColor: appColorPalette.paperLightContrast,
								color: palette.light.text.primary,
							},
						},
					},
					MuiTypography: {
						styleOverrides: {
							root: {
								color: palette.light.text.primary,
							},
						},
					},
			}
			: {
					// ! DARK MODE THEME COMPONENTS
					MuiAlert: {
						styleOverrides: {
							root: {
								color: palette.dark.text.primary,
							},
						},
					},
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: 4,
								// backgroundColor: palette.light.primary.light,
								color: palette.dark.text.primary,
								borderWidth: 2,
								'&:hover': {
									borderWidth: 2,
								},
							},
						},
						variants: [
							{
								props: { variant: 'contained' },
							},
							{
								props: { variant: 'outlined' },
								style: {
									color: appColorPalette.white,
									border: '1px solid #EFEFEF',
								},
							},
							{
								props: { variant: 'primary', color: 'primary' },
								style: {
									border: '4px dashed blue',
									backgroundColor: palette.light.primary.light,
								},
							},
							// {
							// 	props: { variant: 'danger', color: 'danger' },
							// 	style: {
							// 		backgroundColor: palette.light.primary.light,
							// 	},
							// },
						],
					},
					MuiDataGrid: {
						styleOverrides: {
							root: {
								backgroundColor: appColorPalette.paperDark,
							},
						},
					},
					MuiChip: {
						styleOverrides: {
							root: {
								borderColor: palette.dark.text.accent,
							},
							// outlined: {
							// 	backgroundColor: 'transparent',
							// 	'$clickable&:hover, $clickable&:focus, $deletable&:focus': {
							// 		backgroundColor: fade(palette.dark.accent.info, 1),
							// 	},
						},
					},
					MuiLink: {
						styleOverrides: {
							root: {
								color: appColorPalette.lightBlue,
								fontWeight: 600
							},
						},
					},
					MuiListItemText: {
						styleOverrides: {
							primary: {
								fontSize: '1rem',
								color: palette.dark.text.primary,
							},
							secondary: {
								fontSize: '0.8rem',
								color: palette.dark.text.primary,
							},
						},
					},
					MuiPagination: {
						styleOverrides: {
							root: {
								button: {
									color: palette.dark.text.secondary,
									'&.Mui-selected': {
										backgroundColor: palette.dark.primary.light,
										'&:hover': {
											backgroundColor: palette.dark.accent.info,
										},
									},
									'&:hover': {
										backgroundColor: palette.dark.accent.info,
									},
								},
							},
						},
					},
					MuiTableCell: {
						styleOverrides: {
							head: {
								div: {
									fontWeight: 'bold',
									textTransform: 'uppercase',
								},
							},
						},
					},
					MuiTab: {
						styleOverrides: {
							root: {
								'&.Mui-selected': {
									color: cyan[100]
								}
							}
						}
					},
					MuiToolbar: {
						styleOverrides: {
							root: {
								backgroundColor: appColorPalette.paperDarkContrast,
								color: palette.dark.text.primary,
							},
						},
					},
			}),
	},
});
