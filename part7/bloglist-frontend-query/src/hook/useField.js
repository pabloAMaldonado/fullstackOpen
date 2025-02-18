
import { useState } from 'react'

const useField = (type) => {
	const [value, setState] = useState('')

	const onChange = (event) => {
		setState(event.target.value)
	}

	const onClear = () => {
		setState('')
	}

	return {
		spread: {
			type,
			value,
			onChange
		},
		onClear
	}
}

export default useField
