import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useClose } from '../select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
//  Типы пропсов для  ArticleParamsForm
interface ArticleParamsFormProps {
	articleParams: ArticleStateType;
	setArticleParams: (articleParams: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: ArticleParamsFormProps) => {
	const [isActive, setIsActive] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);
	const closeSidebar = () => {
		setIsActive(false);
	};
	useClose({ isOpen: isActive, onClose: closeSidebar, rootRef: asideRef });

	// Состояния настроек шрифта, размера шрифта, цвета шрифта, цвета фона и ширины
	const [fontFamily, setFontFamily] = useState<
		ArticleStateType['fontFamilyOption']
	>(articleParams.fontFamilyOption);
	const [fontSize, setFontSize] = useState<ArticleStateType['fontSizeOption']>(
		articleParams.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<ArticleStateType['fontColor']>(
		articleParams.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<
		ArticleStateType['backgroundColor']
	>(articleParams.backgroundColor);
	const [contentWidth, setContentWidth] = useState<
		ArticleStateType['contentWidth']
	>(articleParams.contentWidth);

	// Функция для открытия/закрытия сайдбара
	const toggleAside = () => {
		setIsActive(!isActive);
	};

	// Применения изменений формы
	const applyFormChanges = (e: FormEvent<HTMLFormElement>) => {
		const newArticleParams: ArticleStateType = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		e.preventDefault();
		setArticleParams(newArticleParams);
	};
	// Ресет формы
	const resetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleParams(defaultArticleState);
	};

	// Обработчик клика вне элемента

	return (
		<div ref={asideRef}>
			{/* Стрелка для откр/закр сайдбара */}
			<ArrowButton open={isActive} handleOpen={toggleAside} />

			{/* Сам сайдбар */}
			<aside
				className={clsx(styles.container, isActive && styles.container_open)}>
				{/* Форма настроек */}
				<form
					className={styles.form}
					onSubmit={applyFormChanges}
					onReset={resetForm}>
					{/* Заголовок формы */}
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						{'Задайте параметры'}
					</Text>
					{/* Выбор шрифта */}
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'шрифт'}
						onChange={setFontFamily}
					/>
					{/* Выбор размера шрифта */}
					<RadioGroup
						name={'FontSize'}
						selected={fontSize}
						options={fontSizeOptions}
						title={'размер шрифта'}
						onChange={setFontSize}
					/>
					{/* Выбор цвета шрифта */}
					<Select
						selected={fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={setFontColor}
					/>
					{/* Разделитель */}
					<Separator />
					{/* Выбор бекграунда */}
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={setBackgroundColor}
					/>
					{/* Ширина контента */}
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={setContentWidth}
					/>
					{/* Ресет/сабмит */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
