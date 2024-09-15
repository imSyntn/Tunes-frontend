
export const useNameDot = () => {
    return (text: string) => {
        if (text.length > 26) {
            const textWithDot = text.slice(0, 27) + '...'
            return textWithDot;
        } else {
            return text;
        }
    }
}