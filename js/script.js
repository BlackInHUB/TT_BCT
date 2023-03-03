import { data } from "./data.js";
import { markup } from "./markup.js";


const controlsContainer = document.querySelector('.controls__wrapper')
const storageOutput = document.getElementById('storageValue');
const transferOutput = document.getElementById('transferValue');
const companyList = document.getElementById('companyList');

companyList.insertAdjacentHTML('afterbegin', markup)

let storage = 0;
let transfer = 0;

const handleChange = (e) => {
    e.target.id === 'storageInput' ? storage = e.target.value : transfer = e.target.value;
    storageOutput.innerHTML = storage + ' ' + 'GB';
    transferOutput.innerHTML = transfer + ' ' + 'GB';
    
    const prices = calculate(storage, transfer);
    
    const min = Math.min(...prices.map(item => item.price));

    prices.map(item => {
        const line = document.getElementById(`${item.name}-line`);
        line.style.cssText = item.price <= min ? `width: ${item.price * 9}px; background-color: ${item.color};` : `width: ${item.price * 9}px;`;
        const price = document.getElementById(`${item.name}-price`);
        price.innerHTML = item.price.toFixed(2);
    })
}

const calculate = (storage, transfer) => {
    const prices = data.map(item => {
        let storageCount = storage;
        let transferCount = transfer;

        if (item.free) {
            storageCount = storage < item.free ? 0 : storage - item.free;
            transferCount = transfer < item.free ? 0 : transfer - item.free;
        };

        let storageP = item.storage * storageCount;
        let transferP = item.transfer * transferCount;

        if (item.hdd || item.multi) {
            const condition = item.hdd ? document.querySelector('input[name="drive"]:checked').value : item.multi ? document.querySelector('input[name="plan"]:checked').value : '';
            storageP = storageCount * item[condition];
        };

        const sum = storageP + transferP;

        const price = sum === 0 ? 0 : sum < item.min ? item.min : sum > item.max ? item.max : sum;

        return {name: item.name, price, color: item.color};
    })

    return prices;
};

controlsContainer.addEventListener('input', handleChange);