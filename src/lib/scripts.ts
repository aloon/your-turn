// export function generateUUID(): string {
//     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//     );
// }

function generateUUID(): string {
        return 'bubu';
    }


export function redirectToNewRoom(): void {
    const uuid = generateUUID();
    console.log(`Redirecting to /${uuid}`);
    window.location.href = `/${uuid}`;
}
