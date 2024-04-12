const T = {
    numberDisplay: (number, replaceValue = '.') => {
        const decimalSplitter = replaceValue === '.' ? ',' : '.';
        let [integer, decimal] = number.toString().split('.');

        if (!decimal) [integer, decimal] = number.toString().split(',');

        if (integer.substring(0, 1) === '0') return `0${integer.substring(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue)}${decimal ? decimalSplitter : ''}${decimal || ''}`;
        else return `${integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue)}${decimal ? decimalSplitter : ''}${decimal || ''}`;
    }
}

export default T;