import * as path from 'path'
import {
    readDir,
    endsWith,
    readFiles,
    removeBlankElements,
    removeIfIncludes,
    removeIfJustNumber,
    removeSimbols,
    mergeElementsUsing,
    splitBy,
    groupElements,
    orderByNumberAttribute
} from './services'

const dirPath = path.join(__dirname, 'subtitles')

const simbolsToRemove = [
    '.', ',', '?', '-', '_', '<i>', '</i>', '\r', '"', '[', ']', '(', ')', '♪',
]


readDir(dirPath)
    .then(endsWith('.srt'))
    .then(readFiles)
    .then(mergeElementsUsing(' '))
    .then(splitBy('\n'))
    .then(removeBlankElements)
    .then(removeIfIncludes('-->'))
    .then(removeIfJustNumber)
    .then(removeSimbols(simbolsToRemove))
    .then(mergeElementsUsing(' '))
    .then(splitBy(' '))
    .then(removeBlankElements)
    .then(removeIfJustNumber)
    .then(groupElements)
    .then(orderByNumberAttribute('quantity')('desc'))
    .then(console.log)
    .catch(err => console.log(err.message))