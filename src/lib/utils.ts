export function toSentenceCase(input: string): string {
	let text = input.replace(/([A-Z])/g, ' $1');
	text = text.charAt(0).toUpperCase() + text.slice(1);
	return text;
}
