type Matcher = { [Symbol.match](string: string): RegExpMatchArray | null };

const extractPlaceholder = (line: string, matcher: Matcher, placeholder: string): { extracted: RegExpMatchArray | null, result: string } => {
    let matches = line.match(matcher);
    for (let i = 0; matches && i < matches.length; i++) {
        line = line.replace(matches[i], placeholder);
    }

    return {
        extracted: matches,
        result: line
    };
}

const reinsertPlaceholders = (line: string, extracted: RegExpMatchArray | null, placeholder: string, textTransformer: (text: string) => string): string => {
    for (let i = 0; extracted && i < extracted.length; i++) {
        line = line.replace(placeholder, textTransformer(extracted[i]));
    }

    return line;
}

const formatPlaceheldLine = (line: string) => {
    return line
        .replace(/\\\\/g, '&#92;')
        .replace(/\\\*/g, '&#42;')
        .replace(/\\_/g, '&#95;')
        .replace(/\\~/g, '&#126;')
        .replace(/\*\*[^\*]+\*\*/g, (match) => `<b>${match.slice(2, match.length - 2)}</b>`)
        .replace(/\*[^\*]+\*/g, (match) => `<i>${match.slice(1, match.length - 1)}</i>`)
        .replace(/~~[^~]+~~/g, (match) => `<s>${match.slice(2, match.length - 2)}</s>`)
        .replace(/__[^_]+__/g, (match) => `<u>${match.slice(2, match.length - 2)}</u>`)
        .replace(/_[^_]+_/g, (match) => `<i>${match.slice(1, match.length - 1)}</i>`);
}

const urlTransformer = (url: string): string => {
    let safeUrl = url.replace(/"/g, "&quot;");
    return `<a href="${safeUrl}" target="_blank">${url}</a>`;
}

const codeTransformer = (code: string): string => {
    return `<code>${code.slice(1, code.length - 1)}</code>`;
}

const formatLine = (line: string): string => {
    const extractedCode = extractPlaceholder(line, /`[^`]+`/g, '<`>');
    const extractedUrl = extractPlaceholder(extractedCode.result, /https?:\/\/[^\s]*[^\s/_\*~K]\/?/g, '<url>');

    const formattedLine = formatPlaceheldLine(extractedUrl.result);

    const formattedLinePostURL = reinsertPlaceholders(formattedLine, extractedUrl.extracted, '<url>', urlTransformer);
    const formattedLinePostCode = reinsertPlaceholders(formattedLinePostURL, extractedCode.extracted, '<`>', codeTransformer);

    return formattedLinePostCode;
}

const formatNonMultilineCode = (line: string): string => {
    let lines = line.split('<br>');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = formatLine(lines[i]);
    }

    return lines.join('<br>');
}

export const formatText = (text: string, multilineCodeClass: string): string => {
    let formatted = text.replace(/<br>/g, '\n').trim();

    let splitAroundMultilineCode = formatted.split('```');
    for (let i = 0; i < splitAroundMultilineCode.length; i++) {
        if (i % 2 === 0 || i == splitAroundMultilineCode.length -1) {
            splitAroundMultilineCode[i] = formatNonMultilineCode(splitAroundMultilineCode[i].replace(/\n/g, '<br>'));
        } else {
            console.log(splitAroundMultilineCode[i])
            splitAroundMultilineCode[i] = `<code class=${multilineCodeClass}>${splitAroundMultilineCode[i].trim().replace(/\n/g, '<br>')}</code>`
        }
    }

    const tripleTickCount = (text.match(/```/g) || []).length;
    formatted = splitAroundMultilineCode.join('```');
    if (tripleTickCount % 2 === 0) {
        formatted = splitAroundMultilineCode.join('');
    } else {
        let lastLine = splitAroundMultilineCode.pop();
        formatted = splitAroundMultilineCode.join('') + '```' + lastLine;
    }

    return formatted;
}