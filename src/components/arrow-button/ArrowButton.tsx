import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type OnClick = (evt?: React.MouseEvent) => void;

export type TArrowProps = {
	open: boolean;
	handleOpen: OnClick;
};

export const ArrowButton = (arrowProps: TArrowProps) => {
	const { open, handleOpen } = arrowProps;
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: open })}
			onClick={handleOpen}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: open })}
			/>
		</div>
	);
};
