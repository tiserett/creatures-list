import classNames from 'classnames';
import React from 'react';

type Props = {
	value: string | number,
	placeholder: string,
	type: string,
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField: React.FC<Props> = ({ value, placeholder, type, handleChange }) => (
	<div className="field">
		<label className="label">
			{placeholder}
			<div className="control">
				<input
					className={classNames('input', { 'is-success': value }, { 'is-danger': !value })}
					type={type}
					placeholder={placeholder}
					name={placeholder.toLowerCase()}
					value={value}
					onChange={handleChange}
					required
				/>
			</div>
		</label>

		{!value && <p className="help is-danger">Please provide {value}</p>}
	</div>
);
