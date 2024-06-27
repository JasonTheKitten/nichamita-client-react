export const toggleFormat = (message: string, formatChars: string, target: HTMLTextAreaElement) => {
    if (target.selectionStart === target.selectionEnd) return "";

    const formatSize = formatChars.length;
    let current = message.substring(target.selectionStart, target.selectionEnd);
    if (current.startsWith(formatChars) && current.endsWith(formatChars) && current.length > formatSize * 2) {
        target.selectionStart += formatSize;
        target.selectionEnd -= formatSize;
        current = current.substring(formatSize, current.length - formatSize);
    }

    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    const formattingStart = selectionStart - formatSize;
    const formattingEnd = selectionEnd + formatSize;
    const surrounding = message.substring(formattingStart, formattingEnd);
    if (surrounding.startsWith(formatChars) && surrounding.endsWith(formatChars)) {
        target.selectionStart = formattingStart;
        target.selectionEnd = formattingEnd;
        return message.substring(selectionStart, selectionEnd);
    } else {
        return formatChars + message.substring(selectionStart, selectionEnd) + formatChars;
    }
};

export const toggleSaveFormat = (message: string, formatChars: string, target: HTMLTextAreaElement) => {
    let selectionMessage = toggleFormat(message, formatChars, target);
    document.execCommand("insertText", false, selectionMessage);
}