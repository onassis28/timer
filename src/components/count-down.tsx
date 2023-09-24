import { useState, useEffect } from 'react';
import './count-down.css';

const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if ((timeLeft as number) > 0 && !isPaused) {
			const timer = setTimeout(
				() => setTimeLeft((timeLeft as number) - 1),
				1000
			);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			setTimeLeft(null);
		}
	}, [timeLeft, isPaused]);

	const startTimer = () => {
		setTimeLeft(10);
	};

	const pauseTimer = () => {
		setIsPaused(true);
	};

	const resumeTimer = () => {
		setIsPaused(false);
	};

	const resetTimer = () => {
		setTimeLeft(null);
	};
	const rightToRender =
		timeLeft === null ? (
			<button className='button' onClick={startTimer}>
				Start timer
			</button>
		) : isPaused ? (
			'Paused...'
		) : (
			timeLeft
		);
	return (
		<div
			onMouseMove={timeLeft ? pauseTimer : undefined}
			onMouseOut={timeLeft ? resumeTimer : undefined}
			onClick={timeLeft ? resetTimer : undefined}>
			{rightToRender}
		</div>
	);
};

export default Countdown;
