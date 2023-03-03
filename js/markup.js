import { data } from "./data.js"

export const markup = data.map(item => {
        const storageToRender = item.ssd ? 
        `<div id="radioContainer">
            <label class="radioContainer__label"><input type="radio" name="drive" value="hdd" checked>HDD</label>
            <label class="radioContainer__label"><input type="radio" name="drive" value="ssd">SSD</label>
        </div>` :
        item.multi ?
        `<div id="radioContainer">
            <label class="radioContainer__label"><input type="radio" name="plan" value="multi" checked>Multi</label>
            <label class="radioContainer__label"><input type="radio" name="plan" value="single">Single</label>
        </div>` :
        '';

        return `<li class="companyList__item">
                    <div class="companyList__item-info">
                        <div>
                            <p class="companyList__item-name">${item.name}</p>
                            ${storageToRender}
                        </div>
                        <div class="companyList__item-icon">Icon</div>
                    </div>
                    <div id="${item.name}-line" class="companyList__item-line"></div>
                    <p><span id="${item.name}-price">0</span>$</p>
                </li>`
}).join('');