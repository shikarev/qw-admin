export function formatPhoneNumber (phoneNumberString: string) {
        var intlCode = (phoneNumberString[0].includes('+') ? '' : '+');
        return [intlCode, phoneNumberString[0], ' (', phoneNumberString.slice(1,4), ') ', phoneNumberString.slice(4,7), '-', phoneNumberString.slice(7)].join('');
}
