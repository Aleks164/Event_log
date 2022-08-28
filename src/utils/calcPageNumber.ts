
export function calcPageNumber(pageNumber: number, rowsNumber: number, serverDataLength: number): number {
    if ((rowsNumber * pageNumber) > serverDataLength) {
        return Math.floor(((rowsNumber * pageNumber) % serverDataLength) / rowsNumber);
    }
    return pageNumber;
}
