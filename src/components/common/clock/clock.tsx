import React, { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import clockAtom from '../../../../src/store/clockAtom';
import moment from 'moment';
import { useAtom } from 'jotai';

type ClockProps = {
	format: string;
};

export default function ClockComponent(props: ClockProps) {
	const [clockTime, setClockTime] = useAtom(clockAtom);

	useEffect(() => {
		const interval = setInterval(() => {
			setClockTime(moment().utc().format(props.format));
		}, 1000);

		return () => clearInterval(interval);
	}, [props.format, setClockTime])

	return (
		<Typography id="utc-date-time-clock" className="clock" variant="caption" noWrap>
			{clockTime} UTC
		</Typography>
	);
}
