export type TopNavItem = {
	title: string;
	disabled?: boolean;
	external?: boolean;
	icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & {
		muiName: string;
	};
	ariaLabel: string;
	badgeCount?: number;
	badgeColor: string;
} & (
	| {
			href: string;
			items?: never;
	  }
	| {
			href?: string;
			items: NavLink[];
	  }
);
export type LeftSideDrawerNavItem = {
	title: string;
	disabled?: boolean;
	external?: boolean;
	icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & {
		muiName: string;
	};
	ariaLabel: string;
	bottom: boolean;
	badgeCount?: number;
	badgeColor: string;
} & (
	| {
			href: string;
			items?: never;
	  }
	| {
			href?: string;
			items: NavLink[];
	  }
);
export type NavigationConfig = {
	topNav: TopNavItem[];
	leftSideDrawerNav: LeftSideDrawerNavItem[];
};
