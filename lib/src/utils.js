import { error } from './Components/Alert/AlertContainer';
const pluralizer = require('pluralize');
export const handleError = (reason) => {
    const response = reason.response;
    if (response) {
        const message = response.data.message;
        const status = response.status;
        if (status >= 500 && status <= 527) {
            error(reason.message);
        }
        else {
            error(message);
        }
    }
};
export const singular = (value) => {
    return pluralizer.singular(value);
};
export const pluralize = (value) => {
    return pluralizer(value);
};
export const stripHtml = (value) => {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = value;
    return tmp.textContent || tmp.innerText || '';
};
export const kebabCase = (str) => {
    if (!str)
        return '';
    let parts = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    if (!parts)
        return '';
    return parts.map(x => x.toLowerCase()).join('-');
};
export const DASHBOARD_OBJECT = '___DASHBOARD__OBJECT___';
export const DASHBOARD_IMAGE_KEY_PREFIX = '___DASHBOARD___IMAGE___';
export function arrayToFileList(files) {
    const data = new ClipboardEvent('').clipboardData || new DataTransfer();
    files.forEach(file => data.items.add(file));
    return data.files;
}
export function mergeFiles(files1, files2) {
    const files = [...files1];
    files2.forEach(file => {
        if (files.find(f => f.size === file.size && f.name === file.name) === undefined) {
            files.push(file);
        }
    });
    return files;
}
export function mergeFileLists(files1, files2) {
    return arrayToFileList(mergeFiles(Array.from(files1), Array.from(files2)));
}
export function diffFiles(oldFiles, newFiles) {
    if (oldFiles === null) {
        return [Array.from(newFiles), []];
    }
    const added = Array.from(newFiles).filter(f => !Array.from(oldFiles).includes(f));
    const removed = Array.from(oldFiles).filter(f => !Array.from(newFiles).includes(f));
    return [added, removed];
}
export function messageType(value) {
    if (typeof value === 'object') {
        return 'array';
    }
    else if (typeof value === 'string') {
        return 'string';
    }
    else {
        return 'numeric';
    }
}
export function removeFile(fileList, file) {
    return arrayToFileList(Array.from(fileList).filter(f => f !== file));
}
