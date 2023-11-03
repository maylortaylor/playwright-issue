export default function enumToArray(enumType) {
	return Object.keys(enumType)
		.filter((value => isNaN(Number(value)) === false))
					.map(key => ({ label: enumType[key], value: Number(key) }));
}