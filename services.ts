import * as fs from 'fs'
import * as path from 'path'

export function readDir(dirPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        try {
            resolve(fs.readdirSync(dirPath).map(filePath => path.join(dirPath, filePath)))

        } catch (e) {
            reject(new Error('Something went wrong!'))
        }
    })
}

export function endsWith(pattern: string) {
    return function (files: string[]): string[] {
        return files.filter(file => file.endsWith(pattern))
    }
}

function readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
            resolve(content)
        } catch (e) {
            reject(new Error('Something went wrong'))
        }
    })
}

export function readFiles(filesPaths: string[]): Promise<string[]> {
    return Promise.all(filesPaths.map(filePath => readFile(filePath)))
}

export function removeBlankElements(array: string[]): string[] {
    return array.filter(el => el.trim())
}

export function removeIfIncludes(pattern: string) {
    return function (array: string[]): string[] {
        return array.filter(el => !el.includes(pattern))
    }
}

export function removeIfJustNumber(array: string[]): string[] {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}

export function removeSimbols(simbols: string[]) {
    return function (array: string[]) {
        return array.map(el => {
            return simbols.reduce((acc, simbol) => {
                return acc.split(simbol).join('')
            }, el)
        })
    }
}

export function mergeElementsUsing(simbol: string) {
    return function (array: string[]): string {
        return array.join(simbol)
    }
}

export function splitBy(simbol: string) {
    return function (content: string): string[] {
        return content.split(simbol)
    }
}

export function groupElements(elements: string[]) {
    return Object.values(elements.reduce((acc: any, element: string) => {
        const el = element.toLowerCase()
        const quantity = acc[el] ? acc[el].quantity + 1 : 1
        acc[el] = { element: el, quantity }
        return acc
    }, {}))
}

export function orderByNumberAttribute(attribute: string) {
    return function (order: string = 'asc') {
        return function (array: string[]) {
            const asc = (ob1: any, ob2: any) => ob1[attribute] - ob2[attribute]
            const desc = (ob1: any, ob2: any) => ob2[attribute] - ob1[attribute]
            return array.sort(order === 'asc' ? asc : desc)
        }
    }
}