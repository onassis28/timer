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

	const handleKeyUp = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case ' ':
			case 'Enter':
				if (timeLeft) {
					resetTimer();
				} else {
					startTimer();
				}
				break;
			default:
				break;
		}
	};
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
		setIsPaused(false);
	};
	const rightToRender =
		timeLeft === null ? (
			<button
				className='button'
				tabIndex={0}
				aria-label='Start Timer'
				onClick={startTimer}
				onKeyUp={handleKeyUp}>
				Start timer
			</button>
		) : isPaused ? (
			<span aria-live='polite'>Paused</span>
		) : (
			<span aria-live='polite'>{timeLeft}</span>
		);
	return (
		<div
			onMouseMove={timeLeft ? pauseTimer : undefined}
			onMouseOut={timeLeft ? resumeTimer : undefined}
			onClick={timeLeft ? resetTimer : undefined}
			tabIndex={0}
			aria-label={timeLeft ? 'Reset Timer' : 'Start Timer'}
			onKeyUp={handleKeyUp}>
			{rightToRender}
		</div>
	);
};

export default Countdown;
